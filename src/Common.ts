import { Observable } from '@reactivex/rxjs';
import { ODataApi } from './ODataApi';
import { Http } from './http';
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
export const Login = (username: string, password: string): Observable<any> => {
    let action = new ODataApi.CustomAction({ name: 'Login', path: '/Root', noCache: true, isAction: true, requiredParams: ['username', 'password'] });
    return ODataApi.Login(action, { data: { 'username': username, 'password': password } });
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
export const Logout = (): Observable<any> => {
    let action = new ODataApi.CustomAction({ name: 'Logout', noCache: true, path: '/Root', isAction: true });
    return ODataApi.Logout(action);
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
export const GetVersionInfo = (): Observable<any> => {
    let action = new ODataApi.CustomAction({ name: 'GetVersionInfo', path: '/Root', isAction: false });
    return ODataApi.CreateCustomAction(action);
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
export const GetAllContentTypes = (): Observable<any> => {
    let action = new ODataApi.CustomAction({ name: 'GetAllContentTypes', path: '/Root', isAction: false });
    return ODataApi.CreateCustomAction(action);
}

export const SetSiteUrl = (url: string = '/') => {
    window['siteUrl'] = url;
}

export const SetServiceToken = (token: string = '/Odata.svc') => {
    window['serviceToken'] = token;
}

export interface IInitializationOptions<THttpProvider, THttpReturnType> {
    HttpProvider: { new (): THttpProvider }
    HttpReturnType: { new (...args): THttpReturnType }
    SiteUrl: string;
    ServiceToken: string;
}

let _initialized: boolean = false;
export function Initialize<T, THttpProvider extends Http.IHttpProvider<T>,
    THttpReturnType>(options: IInitializationOptions<THttpProvider, THttpReturnType>) {
    if (_initialized) {
        throw Error('Sense/NET Components are already initialized');
    }
    _httpProvider = Http.Provider.Create(options.HttpProvider.prototype, options.HttpReturnType.prototype);
    _initialized = true;
}


let _httpProvider: Http.IHttpProvider<any>;
export function GetHttpProvider() {
    if (!_httpProvider)
        throw Error('Sense/NET Components not initialized. Please run Common.Initialize() before using the HttpProvider!');
    return _httpProvider;
}

Initialize({
    HttpProvider: Http.RxObservableHttpProvider,
    HttpReturnType: Promise,
    ServiceToken: 'OData.SVC',
    SiteUrl: ''
})
