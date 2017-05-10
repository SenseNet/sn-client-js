/**
 * @module Authentication
 * @preferred
 * @description This module that contains authentication-related classes, types and interfaces
 */ /** */

import { LoginState, LoginResponse, RefreshResponse, ITokenPayload, Token, TokenStore, IAuthenticationService, TokenPersist } from './';
import { Subject, BehaviorSubject, Observable } from '@reactivex/rxjs';
import { BaseHttpProvider } from '../HttpProviders/BaseHttpProvider';
import { ODataHelper } from '../SN';

/**
 * This service class manages the JWT authentication, the session and the current login state.
 */
export class JwtService implements IAuthenticationService {
    /**
     * This subject indicates the current state of the service
     * @default LoginState.Pending
     */
    public get State(): Observable<LoginState>{
        return this.stateSubject.asObservable();
    }

    /**
     * Gets the current state of the service
     * @default LoginState.Pending
     */
    public get CurrentState(): LoginState{
        return this.stateSubject.getValue();
    }

    private readonly stateSubject: BehaviorSubject<LoginState> = new BehaviorSubject<LoginState>(LoginState.Pending);

    /**
     * The store for JWT tokens
     */
    private TokenStore: TokenStore = new TokenStore(this.repositoryUrl, this.tokenTemplate, (this.persist === 'session') ? TokenPersist.Session : TokenPersist.Expiration);
    
    
    /**
     * Executed before each Ajax call. If the access token has been expired, but the refresh token is still valid, it triggers the token refreshing call
     * @returns {Observable<boolean>} An observable with a variable that indicates if there was a refresh triggered.
     */
    public CheckForUpdate() {
        if (this.TokenStore.AccessToken.IsValid()){
            this.stateSubject.next(LoginState.Authenticated);
            return Observable.from([false]);
        } 
        if (!this.TokenStore.RefreshToken.IsValid()) {
            this.stateSubject.next(LoginState.Unauthenticated);
            return Observable.from([false]);
        } 
        this.stateSubject.next(LoginState.Pending);
        return this.ExecTokenRefresh();
    }
    
    /**
     * Executes the token refresh call. Refresh the token in the Token Store and in the Service, updates the HttpService header
     * @returns {Observable<boolean>} An observable that will be completed with true on a succesfull refresh
     */
    private ExecTokenRefresh() {
        let refreshBase64 = this.TokenStore.RefreshToken.toString();
        let refresh = this.httpProviderRef.Ajax(RefreshResponse, {
            method: 'POST',
            url: ODataHelper.joinPaths(this.repositoryUrl, 'sn-token/refresh'),
            headers: {
                'X-Refresh-Data': this.TokenStore.RefreshToken.toString(),
                'X-Authentication-Type': 'Token'
            }
        });

        refresh.subscribe(response => {
            this.TokenStore.AccessToken = Token.FromHeadAndPayload(response.access);
            this.stateSubject.next(LoginState.Authenticated);
        }, err => {
            console.warn(`There was an error during token refresh: ${err}`);
            this.stateSubject.next(LoginState.Unauthenticated);
        });

        return refresh.map(response => { return true });
    }

    constructor(private readonly httpProviderRef: BaseHttpProvider,
                private readonly repositoryUrl: string,
                private readonly tokenTemplate: string,
                public readonly persist: 'session' | 'expiration') {

        this.stateSubject = new BehaviorSubject<LoginState>(LoginState.Pending);

        this.State.subscribe((s) => {
            this.httpProviderRef.SetGlobalHeader('X-Access-Data', this.TokenStore.AccessToken.IsValid ? this.TokenStore.AccessToken.toString() : null);
        });
        this.CheckForUpdate();
    }

    private handleAuthenticationResponse(response: LoginResponse): boolean {
        this.TokenStore.AccessToken = Token.FromHeadAndPayload(response.access);
        this.TokenStore.RefreshToken = Token.FromHeadAndPayload(response.refresh);
        if (this.TokenStore.AccessToken.IsValid()) {
            this.stateSubject.next(LoginState.Authenticated);
            return true;
        }
        this.stateSubject.next(LoginState.Unauthenticated);
        return false;
    }

    /**
     * It is possible to send authentication requests using this action. You provide the username and password and will get the User object as the response if the login operation was
     * successful or HTTP 403 Forbidden message if it wasn’t. If the username does not contain a domain prefix, the configured default domain will be used. After you logged in the user successfully,
     * you will receive a standard ASP.NET auth cookie which will make sure that your subsequent requests will be authorized correctly.
     *
     * The username and password is sent in clear text, always send these kinds of requests through HTTPS.
     * @param username {string} Name of the user.
     * @param password {string} Password of the user.
     * @returns {Observable} Returns an RxJS observable that you can subscribe of in your code.
     * ```
     * let userLogin = service.Login('alba', 'alba');
     * userLogin.subscribe({
     *  next: response => {
     *      console.log('Login success', response);
     *  },
     *  error: error => console.error('something wrong occurred: ' + error.responseJSON.error.message.value),
     *  complete: () => console.log('done'),
     * });
     * ```
     */
    public Login(username: string, password: string) {
        let sub = new Subject<boolean>();

        this.stateSubject.next(LoginState.Pending);
        let authToken: String = new Buffer(`${username}:${password}`).toString('base64');

        this.httpProviderRef.Ajax(LoginResponse, {
            method: 'POST',
            url: ODataHelper.joinPaths(this.repositoryUrl, 'sn-token/login'),
            headers: {
                'X-Authentication-Type': 'Token',
                'Authorization': `Basic ${authToken}`
            }
        })
            .subscribe(r => {
                let result = this.handleAuthenticationResponse(r);
                sub.next(result);
            }, err => {
                this.stateSubject.next(LoginState.Unauthenticated);
                sub.next(false);
            });

        return sub.asObservable();
    }

    /**
     * Logs out the current user, sets the tokes to 'empty'
     * ```
     * service.Logout();
     * ```
     */
    public Logout(): Observable<boolean> {
        this.TokenStore.AccessToken = Token.CreateEmpty();
        this.TokenStore.RefreshToken = Token.CreateEmpty();
        this.stateSubject.next(LoginState.Unauthenticated);
        return new BehaviorSubject(false).asObservable();
    }
}