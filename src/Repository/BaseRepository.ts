/**
 * @module Repository
 * @preferred
 * @description This module stores the Repository (entry-point to sense NET API) related classes, interfaces and functions.
 */
/** */

import { Observable, Subscription } from '@reactivex/rxjs';
import { HttpProviders, Content, Authentication, ODataApi, ODataHelper, ContentTypes } from '../SN';
import { IRepository, VersionInfo } from './';
import { RequestMethodType } from '../HttpProviders';
import { SnConfigModel } from '../Config/snconfigmodel';
import { ODataRequestOptions } from '../ODataApi/ODataRequestOptions';
import { TokenPersist } from '../Authentication/';

/**
 *
 */
export class BaseRepository<TProviderType extends HttpProviders.BaseHttpProvider, TProviderBaseContentType extends Content>
    implements IRepository<TProviderType, TProviderBaseContentType> {

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
    public Ajax<T>(path: string, method: RequestMethodType, returnsType?: { new (...args): T }, body?: any): Observable<T> {
        this.Authentication.CheckForUpdate();
        return this.Authentication.State.skipWhile(state => state === Authentication.LoginState.Pending)
            .first()
            .flatMap(state => {
                if (!returnsType){
                    returnsType = Object as {new(...args)};
                }
                return this.httpProviderRef.Ajax<T>(returnsType,
                    {
                        url: ODataHelper.joinPaths(this.ODataBaseUrl, path),
                        method: method,
                        body: body,
                        crossDomain: this.IsCrossDomain,
                        responseType: 'json'
                    });
            });
    }
    
    /**
     * Reference to the Http Provider used by the current repository
     */
    public readonly httpProviderRef: HttpProviders.BaseHttpProvider;
    
    /**
     * Reference to the OData API used by the current repository
     */
    public readonly Content: ODataApi.ODataApi<TProviderType, any>;
    
    /**
     * Reference to the Authentication Service used by the current repository
     */
    public readonly Authentication: Authentication.IAuthenticationService;

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
                private readonly httpProviderType: { new (): TProviderType }, 
                authentication: { new (...args): Authentication.IAuthenticationService }) {

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
    public GetAllContentTypes(): Observable<ODataApi.ODataCollectionResponse<ContentTypes.ContentType>>{
        return this.Content.CreateCustomAction<ODataApi.ODataCollectionResponse<ContentTypes.ContentType>>({
                name: 'GetAllContentTypes', 
                path: '/Root', 
                isAction: false
            }, 
            {}, 
            ODataApi.ODataCollectionResponse);
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
    public Load<TContentType extends TProviderBaseContentType = TProviderBaseContentType>(
            idOrPath: string | number,
            options?: ODataApi.IODataParams,
            version?: string,
            returns?: { new (...args): TContentType }): Observable<TContentType> {
        if (!returns) {
            returns = Content as { new (...args) };
        }
        let contentURL = typeof idOrPath === 'string' ?
            ODataHelper.getContentURLbyPath(idOrPath) :
            ODataHelper.getContentUrlbyId(idOrPath);

        let params = new ODataApi.ODataParams(options || {});

        let odataRequestOptions = new ODataRequestOptions({
            path: contentURL,
            params: params
        })
        return this.Content.Get(odataRequestOptions, returns).map(r => r.d);
    }
}
