import { Observable } from '@reactivex/rxjs';
import { Authentication, Content, ODataApi, ODataHelper, ComplexTypes, Http, FieldSettings, Security, Schemas, Enums } from './SN';

export type RequestMethodType = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';
export class Repository<TProviderType extends Http.BaseHttpProvider, TProviderReturns> {
    public static CreateDefault() {
        return new Repository(Http.RxAjaxHttpProvider);
    }

    public static CreateFromConfig() {

    }

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

    public Ajax<T>(path: string, method: RequestMethodType, returnsType?: { new (...args): T }, body?: any) {
        let ajax = this.httpProviderRef.Ajax<T>(returnsType,
            {
                url: `${this.ODataBaseUrl}/${path}`,
                method: method,
                body: body,
                crossDomain: this.IsCrossDomain,
                responseType: 'json'
            });
        return ajax;
    }
    public readonly httpProviderRef: Http.BaseHttpProvider;
    public readonly Contents: ODataApi.Service<TProviderType, any> = new ODataApi.Service(this.httpProviderType, this.baseUrl, this.serviceToken, this);

    public readonly Authentication: Authentication = new Authentication(this);

    constructor(
        private readonly httpProviderType: { new (): TProviderType },
        public readonly baseUrl: string = Repository.DEFAULT_BASE_URL,
        private readonly serviceToken: string = Repository.DEFAULT_SERVICE_TOKEN) {
        this.httpProviderRef = new httpProviderType();
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
    public Load<T extends Content>(idOrPath: string | number, options?: Object, version?: string, returns?: { new (...args): T }) {
        let o = {};
        if (typeof options !== 'undefined') {
            o['params'] = options;
        }
        if (typeof idOrPath === 'string') {
            let contentURL = ODataHelper.getContentURLbyPath(idOrPath);
            o['path'] = contentURL;
            let optionList = new ODataApi.ODataRequestOptions(o as ODataApi.ODataRequestOptions);
            return this.Contents.Get(optionList, returns);
        }
        else if (typeof idOrPath === 'number') {
            let contentURL = ODataHelper.getContentUrlbyId(idOrPath);
            o['path'] = contentURL;
            let optionList = new ODataApi.ODataRequestOptions(o as ODataApi.ODataRequestOptions);

            return this.Contents.Get(optionList, returns);
        }
    }
}