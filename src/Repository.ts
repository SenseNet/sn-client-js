import { Observable, Subscription } from '@reactivex/rxjs';
import { Authentication, Content, ODataApi, ODataHelper, ComplexTypes, HttpProviders, FieldSettings, Security, Schemas, Enums, ODataRequestOptions, CustomAction, LoginState } from './SN';

type RequestMethodType = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';
export abstract class Repository<TProviderType extends HttpProviders.Base, TProviderReturns = any> {
    private static get DEFAULT_BASE_URL(): string {
        if (typeof window !== 'undefined')
            return (window && window.location && window.location.href) || '';
        return '';
    }
    private static readonly DEFAULT_SERVICE_TOKEN: string = 'odata.svc';

    public get IsCrossDomain() {
        return this.baseUrl === Repository.DEFAULT_BASE_URL;
    }

    public get ODataBaseUrl() {
        return `${this.baseUrl}/${this.serviceToken}`;
    }

    public Ajax<T>(path: string, method: RequestMethodType, returnsType?: { new (...args): T }, body?: any): Observable<T> {
        return this.Authentication.State.takeWhile(state => state !== LoginState.Pending)
            .flatMap(state => {
                console.log('LoginState from AJAX:', LoginState[state]);
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
    public readonly httpProviderRef: HttpProviders.Base;
    public readonly Contents: ODataApi<TProviderType, any>;

    public readonly Authentication: Authentication;

    constructor(
        private readonly httpProviderType: { new (): TProviderType },
        public readonly baseUrl: string = Repository.DEFAULT_BASE_URL,
        private readonly serviceToken: string = Repository.DEFAULT_SERVICE_TOKEN) {

        this.httpProviderRef = new httpProviderType();
        this.Authentication = new Authentication(this);
        this.Contents = new ODataApi(this.httpProviderType, this.baseUrl, this.serviceToken, this);
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
        let action = new CustomAction({ name: 'GetVersionInfo', path: '/Root', isAction: false });
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
        let action = new CustomAction({ name: 'GetAllContentTypes', path: '/Root', isAction: false });
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
    public Load<T extends Content = Content>(idOrPath: string | number, options?: Object, version?: string, returns?: { new (...args): T }): Observable<T> {
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
            let optionList = new ODataRequestOptions(o as ODataRequestOptions);
            return this.Contents.Get(optionList, returns).map(r => {
                return Content.Create(returns, r.d.results[0], this);
            });
        }
        else if (typeof idOrPath === 'number') {
            let contentURL = ODataHelper.getContentUrlbyId(idOrPath);
            o['path'] = contentURL;
            let optionList = new ODataRequestOptions(o as ODataRequestOptions);

            return this.Contents.Get(optionList, returns).map(r => {
                return Content.Create(returns, r.d.results[0], this);
            });
        }
    }
}

export class SnRepository extends Repository<HttpProviders.RxAjax, any>{
    constructor(baseUrl?: string, serviceToken?: string) {
        super(HttpProviders.RxAjax, baseUrl, serviceToken);
    }
}

export class SnTestRepository extends Repository<HttpProviders.Mock, any>{
    constructor(baseUrl?: string, serviceToken?: string) {
        super(HttpProviders.Mock, baseUrl, serviceToken);
    }

}