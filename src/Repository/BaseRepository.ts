/**
 * @module Repository
 * @preferred
 * @description This module stores the Repository (entry-point to sense NET API) related classes, interfaces and functions.
 */
/** */

import { Observable } from '@reactivex/rxjs';
import { VersionInfo, RepositoryEventHub } from './';
import { BaseHttpProvider } from '../HttpProviders';
import { SnConfigModel } from '../Config/snconfigmodel';
import { ODataRequestOptions } from '../ODataApi';
import { IAuthenticationService } from '../Authentication/';
import { IODataParams, ODataParams } from '../ODataApi';
import { ContentType } from '../ContentTypes';
import { Content } from '../Content';
import { ODataApi } from '../ODataApi';
import { ODataHelper, Authentication, ContentTypes } from '../SN';
import { ODataCollectionResponse } from '../ODataApi';
import { ContentSerializer } from '../ContentSerializer';
import { Query, QuerySegment, QueryExpression, QueryResult } from '../Query';

/**
 *
 */
export class BaseRepository<TProviderType extends BaseHttpProvider = BaseHttpProvider,
    TAuthenticationServiceType extends IAuthenticationService = IAuthenticationService> {
    private odataApi: ODataApi<TProviderType, Content>;
    public readonly Events: RepositoryEventHub = new RepositoryEventHub();

    /**
     * Will be true if the Repository's host differs from the current host
     */
    public get IsCrossDomain() {
        return this.Config.RepositoryUrl !== SnConfigModel.DEFAULT_BASE_URL;
    }

    /**
     * Returns the Repository's base OData Url (e.g.: https://demo.sensenet.com/odata.svc)
     */
    public get ODataBaseUrl() {
        return ODataHelper.joinPaths(this.Config.RepositoryUrl, this.Config.ODataToken);
    }

    /**
     * Public endpoint for making Ajax calls to the Repository
     * @param {string} path The Path for the call
     * @param {'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE'} method The method type
     * @param {{ new (...args): T }} returnsType The expected return type
     * @param {any} body The post body (optional)
     * @returns {Observable<T>} An observable, which will be updated with the response.
     */
    public Ajax<T>(path: string, method: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE', returnsType?: { new(...args: any[]): T }, body?: any): Observable<T> {
        this.Authentication.CheckForUpdate();
        return this.Authentication.State.skipWhile(state => state === Authentication.LoginState.Pending)
            .first()
            .flatMap(state => {
                if (!returnsType) {
                    returnsType = Object as { new(...args: any[]): any };
                }
                return this.httpProviderRef.Ajax<T>(returnsType,
                    {
                        url: ODataHelper.joinPaths(this.ODataBaseUrl, path),
                        method: method,
                        body: body,
                        crossDomain: this.IsCrossDomain,
                        withCredentials: this.IsCrossDomain,
                        responseType: 'json',
                    });
            });
    }

    /**
     * Reference to the Http Provider used by the current repository
     */
    public readonly httpProviderRef: TProviderType;

    /**
     * Reference to the OData API used by the current repository
     */
    public get Content(): ODataApi<TProviderType, any>{
        console.warn('The property repository.Content is deprecated and will be removed in the near future. Use repositoy.GetODataApi() instead.')
        return this.odataApi;
    };

    public GetODataApi(): ODataApi<TProviderType, Content>{
        return this.odataApi;
    }

    /**
     * Reference to the Authentication Service used by the current repository
     */
    public readonly Authentication: TAuthenticationServiceType;

    /**
     * Reference to the configuration used by the current repository
     */
    public readonly Config: SnConfigModel;

    /**
     * @param config The Repository's configuration entry
     * @param httpProviderType The type of the Http Provider, should extend HttpProviders.BaseHttpProvider
     * @param authentication The type of the Authentication Service to be used.
     */
    constructor(config: Partial<SnConfigModel>,
        private readonly httpProviderType: { new(): TProviderType },
        authentication: { new(...args: any[]): TAuthenticationServiceType }) {

        this.httpProviderRef = new httpProviderType();
        this.Config = new SnConfigModel(config);

        //warning: Authentication constructor parameterization is not type-safe
        this.Authentication = new authentication(this.httpProviderRef, this.Config.RepositoryUrl, this.Config.JwtTokenKeyTemplate, this.Config.JwtTokenPersist);
        this.odataApi = new ODataApi(this.httpProviderType, this);
    }

    /**
     * Gets the complete version information about the core product and the installed applications. This function is accessible only for administrators by default. You can learn more about the
     * subject in the SnAdmin article. You can read detailed description of the function result.
     * @returns {Observable} Returns an RxJS observable that you can subscribe of in your code.
     * ```
     * let getVersionInfo = GetVersionInfo();
     * getVersionInfo.subscribe({
     *  next: response => {
     *      console.log('success');
     *  },
     *  error: error => console.error('something wrong occurred: ' + error.responseJSON.error.message.value),
     *  complete: () => console.log('done'),
     * });
     * ```
     */
    public GetVersionInfo() {
        return this.odataApi.CreateCustomAction({ name: 'GetVersionInfo', path: '/Root', isAction: false }, {}, VersionInfo);
    }
    /**
     * Returns the list of all ContentTypes in the system.
     * @returns {Observable<ODataCollectionResponse<ContentTypes.ContentType>>} Returns an RxJS observable that you can subscribe of in your code.
     * ```
     * let getAllContentTypes = GetAllContentTypes();
     * getAllContentTypes.subscribe({
     *  next: response => {
     *      console.log('success');
     *  },
     *  error: error => console.error('something wrong occurred: ' + error.responseJSON.error.message.value),
     *  complete: () => console.log('done'),
     * });
     * ```
     */
    public GetAllContentTypes(): Observable<ContentType[]> {
        return this.odataApi.CreateCustomAction<ODataCollectionResponse<ContentType>>({
            name: 'GetAllContentTypes',
            path: '/Root',
            isAction: false
        },
            undefined,
            ODataCollectionResponse)
            .map(resp => {
                return resp.d.results.map(c => this.HandleLoadedContent(c, ContentType));
            });
    }


    private _loadedContentReferenceCache: Content[] = [];

    /**
     * Creates a Content instance that is loaded from the Repository. This method should be used only to instantiate content from payload received from the backend.
     * @param type {string} The Content will be a copy of the given type.
     * @param options {SenseNet.IContentOptions} Optional list of fields and values.
     * @returns {SenseNet.Content}
     * ```ts
     * var content = SenseNet.Content.HandleLoadedContent('Folder', { DisplayName: 'My folder' }); // content is an instance of the Folder with the DisplayName 'My folder'
     * ```
     */
    public HandleLoadedContent<T extends Content, O extends T['options']>(opt: O, contentType?: { new(...args: any[]): T }): T {
        let instance: T;
        const realContentType = (contentType || (opt.Type && (ContentTypes as any)[opt.Type]) || Content) as {new(...args: any[]): T};

        if (opt.Id){
            if (this._loadedContentReferenceCache[opt.Id]){
                instance = this._loadedContentReferenceCache[opt.Id] as T;
                instance['UpdateLastSavedFields'](opt);
            } else {
                instance = Content.Create(opt, realContentType, this);
                this._loadedContentReferenceCache[opt.Id] = instance;
            }

        } else {
            instance = Content.Create(opt, realContentType, this);
        }
        instance['_isSaved'] = true;
        this.Events.Trigger.ContentLoaded({ Content: instance});
        return instance;
    }

    /**
     * Requests a Content by the given id.
     * @param idOrPath {number|string} Id of the requested Content.
     * @param version {string} A string containing the version of the requested Content.
     * @param options {Object} JSON object with the possible ODATA parameters like select, expand, etc.
     * @returns {Observable<T>} Returns an RxJS observable that you can subscribe of in your code.
     * ```ts
     * var content = SenseNet.Content.Load(1234, { expand: 'Avatar' }, 'A.1', ContentTypes.User);
     * content
     *     .map(response => response.d)
     *     .subscribe({
     *        next: response => {
     *            //do something with the response
     *        },
     *        error: error => console.error('something wrong occurred: ' + error.responseJSON.error.message.value),
     *        complete: () => console.log('done'),
     * })
     * ```
    */
    public Load<TContentType extends Content>(
        idOrPath: string | number,
        odataOptions?: IODataParams,
        returnsType?: { new(...args: any[]): TContentType },
        version?: string): Observable<TContentType> {

        let contentURL = typeof idOrPath === 'string' ?
            ODataHelper.getContentURLbyPath(idOrPath) :
            ODataHelper.getContentUrlbyId(idOrPath);

        let params = new ODataParams(odataOptions || {});

        let odataRequestOptions = new ODataRequestOptions({
            path: contentURL,
            params: params
        })
        const returnType = returnsType || Content as { new(...args: any[]): any };

        return this.odataApi.Get(odataRequestOptions, returnType)
            .share()
            .map(r => {
                return this.HandleLoadedContent(r.d, returnType);
            });
    }

    /**
     * Shortcut to Content.Create
     */
    CreateContent: <T extends Content, K extends T['options']>(options: K, contentType: {new(...args: any[]): T}) => T = 
        (options, contentType) => Content.Create(options, contentType, this);

    /**
     * Parses a Content instance from a stringified SerializedContent<T> instance
     * @param stringifiedContent The stringified SerializedContent<T>
     * @throws Error if the Content belongs to another Repository (based it's Origin)
     * @returns The loaded Content
     */
    public ParseContent < T extends Content = Content > (stringifiedContent: string): T {
        const serializedContent = ContentSerializer.Parse<T>(stringifiedContent);
        if (serializedContent.Origin.indexOf(this.ODataBaseUrl) !== 0){
            throw new Error('Content belongs to a different Repository.');
        }
        return this.HandleLoadedContent(serializedContent.Data)
    }

    RunQuery: <T extends Content>(build: (first: QueryExpression<Content>) => QuerySegment<T> | string, params?: ODataParams) => Observable<QueryResult<T>> 
        = (build, params) => Query.Exec(build, this, 'Root', params);

}
