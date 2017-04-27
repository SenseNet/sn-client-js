/**
 * @module Repository
 * @preferred
 * @description This module stores repository-related stuff.
 */
/** */

import { Observable, Subscription } from '@reactivex/rxjs';
import { HttpProviders, Content, Authentication, ODataApi, ODataHelper } from '../SN';
import { IRepository } from './';
import { RequestMethodType } from '../HttpProviders';
import { SnConfigModel } from '../Config/snconfigmodel';
import { ODataRequestOptions } from '../ODataApi/ODataRequestOptions';
import { TokenPersist } from '../Authentication/';

export abstract class BaseRepository<TProviderType extends HttpProviders.BaseHttpProvider, TProviderBaseContentType extends Content>
    implements IRepository<TProviderType, TProviderBaseContentType> {

    public get IsCrossDomain() {
        return this.Config.RepositoryUrl !== SnConfigModel.DEFAULT_BASE_URL;
    }

    public get ODataBaseUrl() {
        return ODataHelper.joinPaths(this.Config.RepositoryUrl, this.Config.ODataToken);
    }

    public Ajax<T>(path: string, method: RequestMethodType, returnsType?: { new (...args): T }, body?: any): Observable<T> {
        this.Authentication.CheckForUpdate();
        return this.Authentication.State.skipWhile(state => state === Authentication.LoginState.Pending)
            .first()
            .flatMap(state => {
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
    public readonly httpProviderRef: HttpProviders.BaseHttpProvider;
    public readonly Contents: ODataApi.ODataApi<TProviderType, any>;
    public readonly Authentication: Authentication.IAuthenticationService;

    public readonly Config: SnConfigModel;

    /**
     * 
     * @param httpProviderType The type of the Http Provider, should extend HttpProviders.BaseHttpProvider
     * @param config 
     * @param authentication 
     */
    constructor(config: Partial<SnConfigModel>, private readonly httpProviderType: { new (): TProviderType }, authentication: { new (...args): Authentication.IAuthenticationService }) {
        this.httpProviderRef = new httpProviderType();
        this.Config = new SnConfigModel(config);
        //warning: constructor parameterization is not type-safe
        this.Authentication = new authentication(this.httpProviderRef, this.Config.RepositoryUrl, this.Config.JwtTokenKeyTemplate, this.Config.JwtTokenPersist);
        this.Contents = new ODataApi.ODataApi(this.httpProviderType, this.Config.RepositoryUrl, this.Config.ODataToken, this);
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
        return this.Contents.CreateCustomAction({ name: 'GetVersionInfo', path: '/Root', isAction: false });
    }
    /**
     * Returns the list of all ContentTypes in the system.
     * @returns {Observable} Returns an RxJS observable that you can subscribe of in your code.
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
    public GetAllContentTypes = () => {
        return this.Contents.CreateCustomAction({ name: 'GetAllContentTypes', path: '/Root', isAction: false });
    }

    /**
     * Requests a Content by the given id.
     * @param idOrPath {number|string} Id of the requested Content.
     * @param version {string} A string containing the version of the requested Content.
     * @param options {Object} JSON object with the possible ODATA parameters like select, expand, etc.
     * @returns {Observable} Returns an RxJS observable that you can subscribe of in your code.
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
    public Load<TContentType extends TProviderBaseContentType = TProviderBaseContentType>(idOrPath: string | number, options?: ODataApi.IODataParams, version?: string, returns?: { new (...args): TContentType }): Observable<TContentType> {
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
        return this.Contents.Get(odataRequestOptions, returns).map(r => {
            return Content.Create(returns, r.d, this);
        });

    }
}
