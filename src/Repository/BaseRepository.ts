/**
 * @module Repository
 * @preferred
 * @description This module stores the Repository (entry-point to sense NET API) related classes, interfaces and functions.
 */
/** */

import { Observable, Subject } from '@reactivex/rxjs';
import { HttpProviders, Authentication, ODataApi, ODataHelper } from '../SN';
import { VersionInfo } from './';
import { RequestMethodType } from '../HttpProviders';
import { SnConfigModel } from '../Config/snconfigmodel';
import { ODataRequestOptions } from '../ODataApi/ODataRequestOptions';
import { IAuthenticationService } from '../Authentication/';
import { ICustomActionOptions } from '../ODataApi/CustomAction';
import { IODataParams } from '../ODataApi/ODataParams';
import { ContentType } from '../ContentTypes';
import { Content, IContentOptions } from '../Content';

/**
 *
 */
export class BaseRepository<TProviderType extends HttpProviders.BaseHttpProvider = HttpProviders.BaseHttpProvider,
    TAuthenticationServiceType extends IAuthenticationService = IAuthenticationService> {

    private onContentCreatedSubject = new Subject<Content>();
    private onContentCreateFailedSubject = new Subject<{ content: Content, error: any }>();
    private onContentModifiedSubject = new Subject<{ content: Content, originalFields: IContentOptions, change: IContentOptions }>();
    private onContentModificationFailedSubject = new Subject<{ content: Content, change: IContentOptions, error: any }>();
    private onContentLoadedSubject = new Subject<Content>();
    private onContentDeletedSubject = new Subject<{ contentData: IContentOptions, permanently: boolean }>();
    private onContentDeleteFailedSubject = new Subject<{ content: Content, permanently: boolean, error: any }>();
    private onCustomActionExecutedSubject
    = new Subject<[ICustomActionOptions, IODataParams | undefined, Object]>();

    private onCustomActionFailedSubject
    = new Subject<[ICustomActionOptions, IODataParams | undefined, { new(...args: any[]): Object }, Error]>();


    /**
     * Triggered after a succesful Content creation
     */
    public OnContentCreated = this.onContentCreatedSubject.asObservable();

    /**
     * Triggered after Content creation has been failed
     */
    public OnContentCreateFailed = this.onContentCreateFailedSubject.asObservable();

    /**
     * Triggered after modifying a Content
     */
    public OnContentModified = this.onContentModifiedSubject.asObservable();

    /**
     * Triggered when failed to modify a Content
     */
    public OnContentModificationFailedSubject = this.onContentModificationFailedSubject.asObservable();

    /**
     * Triggered when a Content is loaded from the Repository
     */
    public OnContentLoaded = this.onContentLoadedSubject.asObservable();

    /**
     * Triggered after deleting a Content
     */
    public OnContentDeleted = this.onContentDeletedSubject.asObservable();

    /**
     * Triggered after deleting a content has been failed
     */
    public OnContentDeleteFailed = this.onContentDeleteFailedSubject.asObservable();

    public OnCustomActionExecuted = this.onCustomActionExecutedSubject.asObservable();

    public OnCustomActionFailed = this.onCustomActionFailedSubject.asObservable();

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
     * @param {RequestMethodType} method The method type
     * @param {{ new (...args): T }} returnsType The expected return type
     * @param {any} body The post body (optional)
     * @returns {Observable<T>} An observable, which will be updated with the response.
     */
    public Ajax<T>(path: string, method: RequestMethodType, returnsType?: { new(...args: any[]): T }, body?: any): Observable<T> {
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
    public readonly Content: ODataApi.ODataApi<TProviderType, any>;

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
        this.Content = new ODataApi.ODataApi(this.httpProviderType, this);
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
        return this.Content.CreateCustomAction({ name: 'GetVersionInfo', path: '/Root', isAction: false }, {}, VersionInfo);
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
        return this.Content.CreateCustomAction<ODataApi.ODataCollectionResponse<ContentType>>({
            name: 'GetAllContentTypes',
            path: '/Root',
            isAction: false
        },
            undefined,
            ODataApi.ODataCollectionResponse)
            .map(resp => {
                return resp.d.results.map(c => this.HandleLoadedContent(ContentType, c));
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
    public HandleLoadedContent<T extends Content, O extends T['options']>(contentType: { new(...args: any[]): T }, opt: O): T {
        let instance: T;
        
        if (opt.Id){
            if (this._loadedContentReferenceCache[opt.Id]){
                instance = this._loadedContentReferenceCache[opt.Id] as T;
                instance['UpdateLastSavedFields'](opt);
            } else {
                instance = Content.Create(contentType, opt, this);
                this._loadedContentReferenceCache[opt.Id] = instance;
            }

        } else {
            instance = Content.Create(contentType, opt, this);
        }
        instance['_isSaved'] = true;
        this.onContentLoadedSubject.next(instance);
        return instance;
    }

    /**
     * Requests a Content by the given id.
     * @param idOrPath {number|string} Id of the requested Content.
     * @param version {string} A string containing the version of the requested Content.
     * @param options {Object} JSON object with the possible ODATA parameters like select, expand, etc.
     * @returns {Observable<T>} Returns an RxJS observable that you can subscribe of in your code.
     * ```ts
     * var content = SenseNet.Content.Load(1234, 'A.1', { expand: 'Avatar' });
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
        options?: ODataApi.IODataParams,
        version?: string,
        returns?: { new(...args: any[]): TContentType }): Observable<TContentType> {

        let contentURL = typeof idOrPath === 'string' ?
            ODataHelper.getContentURLbyPath(idOrPath) :
            ODataHelper.getContentUrlbyId(idOrPath);

        let params = new ODataApi.ODataParams(options || {});

        let odataRequestOptions = new ODataRequestOptions({
            path: contentURL,
            params: params
        })
        const returnType = returns || Content as { new(...args: any[]): any };

        return this.Content.Get(odataRequestOptions, returnType)
            .share()
            .map(r => {
                return this.HandleLoadedContent(returnType, r.d);
            });
    }
}
