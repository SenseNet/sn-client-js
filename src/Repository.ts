import { Http } from './Http';
import { Observable } from '@reactivex/rxjs';
import { ODataApi } from './ODataApi';
import {ODataHelper} from './ODataHelper';

export class Repository<TProviderType extends Http.IHttpProvider<Http.ReturnType<any>>, TProviderReturns extends (Observable<any> | Promise<any>)> {

    private static readonly DEFAULT_BASE_URL: string = window.location.href;
    private static readonly DEFAULT_SERVICE_TOKEN: string = 'odata.svc';

    public readonly OData: ODataApi.Service<TProviderType, any> = new ODataApi.Service(this.httpProvider, this.baseUrl, this.serviceToken, this);

    constructor(
        private readonly httpProvider: { new (): TProviderType },
        //private readonly providerReturns: {new(...args): TProviderReturns}, 
        private readonly baseUrl: string = Repository.DEFAULT_BASE_URL,
        private readonly serviceToken: string = Repository.DEFAULT_SERVICE_TOKEN)
        { }

    /**
     * It is possible to send authentication requests using this action. You provide the username and password and will get the User object as the response if the login operation was
     * successful or HTTP 403 Forbidden message if it wasn’t. If the username does not contain a domain prefix, the configured default domain will be used. After you logged in the user successfully,
     * you will receive a standard ASP.NET auth cookie which will make sure that your subsequent requests will be authorized correctly.
     *
     * As the username and password is sent in clear text, always send these kinds of requests throuigh HTTPS.
     * @params username {string} Name of the user.
     * @params password {string} Password of the user.
     * @returns {Observable} Returns an RxJS observable that you can subscribe of in your code.
     * ```
     * let userLogin = Login('alba', 'alba');
     * userLogin.subscribe({
     *  next: response => {
     *      console.log('success');
     *  },
     *  error: error => console.error('something wrong occurred: ' + error.responseJSON.error.message.value),
     *  complete: () => console.log('done'),
     * });
     * ```
     */
    public Login(username: string, password: string) {
        let action = new ODataApi.CustomAction({ name: 'Login', path: '/Root', noCache: true, isAction: true, requiredParams: ['username', 'password'] });
        return this.OData.Login(action, { data: { 'username': username, 'password': password } });
    }
    /**
     * Similarly to the Login action above, you can send a logout action to the portal.
     * @returns {Observable} Returns an RxJS observable that you can subscribe of in your code.
     * ```
     * let userLogout = Logout();
     * userLogout.subscribe({
     *  next: response => {
     *      console.log('success');
     *  },
     *  error: error => console.error('something wrong occurred: ' + error.responseJSON.error.message.value),
     *  complete: () => console.log('done'),
     * });
     * ```
     */
    public Logout() {
        let action = new ODataApi.CustomAction({ name: 'Logout', noCache: true, path: '/Root', isAction: true });
        return this.OData.Logout(action);
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
        return this.OData.CreateCustomAction(action);
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
        return this.OData.CreateCustomAction(action);
    }

    public Load(path: string, options?: Object, version?: string);
    /**
     * Requests a Content by the given id.
     * @param id {number} Id of the requested Content.
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
    public Load(id: number, options?: Object, version?: string);
    public Load(arg: any, options?: Object, version?: string) {
        let o = {};
        if (typeof options !== 'undefined') {
            o['params'] = options;
        }
        if (typeof arg === 'string') {
            let contentURL = ODataHelper.getContentURLbyPath(arg);
            o['path'] = contentURL;
            let optionList = new ODataApi.ODataRequestOptions(o as ODataApi.ODataRequestOptions);
            return this.OData.GetContent(optionList);
        }
        else if (typeof arg === 'number') {
            let contentURL = ODataHelper.getContentUrlbyId(arg);
            o['path'] = contentURL;
            let optionList = new ODataApi.ODataRequestOptions(o as ODataApi.ODataRequestOptions);

            return this.OData.GetContent(optionList);
        }
    }

}


let promiseRepo = new Repository(Http.RxPromiseHttpProvder);

let obsRepo = new Repository(Http.RxObservableHttpProvider);

obsRepo.Login('', '');