/**
 * @module "Authentication"
 * 
 * This module is a library module that contains authentication-related classes and references
 */ /** */

import { LoginState, LoginResponse, RefreshResponse, ITokenPayload, Token, TokenStore } from './';
import { Subject, BehaviorSubject, Observable } from '@reactivex/rxjs';
import { Repository } from '../SN';

export class Authentication {
    public readonly State: BehaviorSubject<LoginState> = new BehaviorSubject<LoginState>(LoginState.Pending);
    private TokenStore = new TokenStore(this.repository.baseUrl);
    private accessToken: Token = Token.Empty;
    private refreshToken: Token = Token.Empty;
    public CheckForUpdate() {
        if (this.accessToken.IsValid() || !this.refreshToken.IsValid()) {
            return Observable.from([false]);
        } else {
            this.State.next(LoginState.Pending);
            return this.ExecTokenRefresh();
        }
    }
    private ExecTokenRefresh() {
        let refreshBase64 = this.refreshToken.toString();
        let refresh = this.repository.httpProviderRef.Ajax(RefreshResponse, {
            method: 'POST',
            url: `${this.repository.baseUrl}sn-token/refresh`,
            headers: {
                'X-Refresh-Data': this.refreshToken.toString(),
                'X-Authentication-Type': 'Token'
            }
        });

        refresh.subscribe(response => {
            this.TokenStore.AccessToken = Token.FromHeadAndPayload(response.access);
            this.accessToken = this.TokenStore.AccessToken;
            this.repository.httpProviderRef.SetGlobalHeader('X-Access-Data', response.access);
            this.State.next(LoginState.Authenticated);
        }, err => {
            console.warn(`There was an error during token refresh: ${err}`);
            this.State.next(LoginState.Unauthenticated);
        });

        return refresh.map(response => { return true });
    }
    constructor(private repository: Repository<any, any>) {

        this.State.subscribe(s => {
            console.log(`SN Login state: '${LoginState[s]}'`)
        });

        this.accessToken = this.TokenStore.AccessToken;
        this.refreshToken = this.TokenStore.RefreshToken;

        if (this.accessToken.IsValid()) {
            // Access Token is valid. Nothing to do.
            this.State.next(LoginState.Authenticated);
        } else {
            if (this.refreshToken.IsValid()) {
                this.CheckForUpdate();
            } else {
                // Both Access token and Refresh tokens are invalid. Nothing to do, user is unauthenticated.
                this.State.next(LoginState.Unauthenticated);
            }
        }
    }

    private handleAuthenticationResponse(response: LoginResponse): boolean {
        this.TokenStore.AccessToken = Token.FromHeadAndPayload(response.access);
        this.TokenStore.RefreshToken = Token.FromHeadAndPayload(response.refresh);
        if (this.TokenStore.AccessToken.IsValid()) {
            this.State.next(LoginState.Authenticated);
            return true;
        }
        this.repository.httpProviderRef.SetGlobalHeader('X-Access-Data', response.access);
        this.State.next(LoginState.Unauthenticated);
        return false;
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
        let sub = new Subject<boolean>();

        this.State.next(LoginState.Pending);
        let authToken: String = new Buffer(`${username}:${password}`).toString('base64');

        this.repository.httpProviderRef.Ajax(LoginResponse, {
            method: 'POST',
            url: `${this.repository.baseUrl}sn-token/login`,
            headers: {
                'X-Authentication-Type': 'Token',
                'Authorization': `Basic ${authToken}`
            }
        })
            .subscribe(r => {
                let result = this.handleAuthenticationResponse(r);
                sub.next(result);
            }, err => {
                this.State.next(LoginState.Unauthenticated);
                sub.next(false);
            });

        return sub.asObservable();
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
    public Logout(): void {
        this.TokenStore.AccessToken = Token.Empty;
        this.TokenStore.RefreshToken = Token.Empty;
    }
}