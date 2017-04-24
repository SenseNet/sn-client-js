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

export abstract class BaseRepository<TProviderType extends HttpProviders.BaseHttpProvider, TProviderBaseContentType extends Content>
        implements IRepository<TProviderType, TProviderBaseContentType> {
    private static get DEFAULT_BASE_URL(): string {
        if (typeof window !== 'undefined')
            return (window && window.location && window.location.href) || '';
        return '';
    }
    private static readonly DEFAULT_SERVICE_TOKEN: string = 'odata.svc';

    public get IsCrossDomain() {
        return this.config.RepositoryUrl === BaseRepository.DEFAULT_BASE_URL;
    }

    public get ODataBaseUrl() {
        return `${this.config.RepositoryUrl}/${this.config.ODataToken}`;
    }

    public Ajax<T>(path: string, method: RequestMethodType, returnsType?: { new (...args): T }, body?: any): Observable<T> {
        this.Authentication.CheckForUpdate();
        return this.Authentication.State.skipWhile(state => state === Authentication.LoginState.Pending)
            .first()
            .flatMap(state => {
                return this.httpProviderRef.Ajax<T>(returnsType,
                    {
                        url: `${this.ODataBaseUrl}/${path}`,
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

    /**
     * 
     * @param httpProviderType The type of the Http Provider, should extend HttpProviders.BaseHttpProvider
     * @param baseUrl 
     * @param serviceToken 
     * @param config 
     * @param authentication 
     */
    constructor(
        private readonly httpProviderType: { new (): TProviderType },
        // public readonly baseUrl: string = BaseRepository.DEFAULT_BASE_URL,
        // private readonly serviceToken: string = BaseRepository.DEFAULT_SERVICE_TOKEN,
        public readonly config: SnConfigModel,
        authentication: {new(...args): Authentication.IAuthenticationService}) {

        this.httpProviderRef = new httpProviderType();
        this.Authentication = new authentication(this);
        this.Contents = new ODataApi.ODataApi(this.httpProviderType, this.config.RepositoryUrl, this.config.ODataToken, this);
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
        let action = new ODataApi.CustomAction({ name: 'GetVersionInfo', path: '/Root', isAction: false });
        return this.Contents.CreateCustomAction(action);
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
        let action = new ODataApi.CustomAction({ name: 'GetAllContentTypes', path: '/Root', isAction: false });
        return this.Contents.CreateCustomAction(action);
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
    public Load<TContentType extends TProviderBaseContentType = TProviderBaseContentType>(idOrPath: string | number, options?: Object, version?: string, returns?: { new (...args): TContentType }): Observable<TContentType> {
        let o = {};

        if (typeof options !== 'undefined') {
            o['params'] = options;
        }

        if (!returns) {
            returns = Content as { new (...args) };
        }

        if (typeof idOrPath === 'string') {
            let contentURL = ODataHelper.getContentURLbyPath(idOrPath);
            o['path'] = contentURL;
            let optionList = new ODataApi.ODataRequestOptions(o as ODataApi.ODataRequestOptions);
            return this.Contents.Get(optionList, returns).map(r => {
                return Content.Create(returns, r.d.results[0], this);
            });
        }
        else if (typeof idOrPath === 'number') {
            let contentURL = ODataHelper.getContentUrlbyId(idOrPath);
            o['path'] = contentURL;
            let optionList = new ODataApi.ODataRequestOptions(o as ODataApi.ODataRequestOptions);

            return this.Contents.Get(optionList, returns).map(r => {
                return Content.Create(returns, r.d.results[0], this);
            });
        }
    }
}
