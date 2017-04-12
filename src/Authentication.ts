import { Repository } from './SN';
import { BehaviorSubject } from '@reactivex/rxjs';

export enum LoginState{
    Pending,
    Unauthenticated,
    Authenticated
}

export class Authentication {

    public readonly State: BehaviorSubject<LoginState> = new BehaviorSubject<LoginState>(LoginState.Pending);

    constructor(private repository: Repository<any, any>) { 
        // ToDo: Check the accessToken / refreshToken expirations
    }
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
        
        this.State.next(LoginState.Pending);
        
        let authToken: String = new Buffer(`${username}:${password}`).toString('base64');
        return this.repository.httpProviderRef.Ajax(Object, {
            method: 'POST',
            url: this.repository.ODataBaseUrl,
            headers: {
                'X-Authentication-Type': 'Token',
                'Authorization': `Basic ${authToken}`
            }
        });
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
        return this.repository.Ajax(`('Root')/Logout&nocache=${new Date().getTime()}`, 'POST', Boolean);
    }
}