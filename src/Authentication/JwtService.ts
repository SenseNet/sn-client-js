/**
 * @module Authentication
 */ /** */

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { BaseRepository } from '../Repository/BaseRepository';
import { ODataHelper } from '../SN';
import { IAuthenticationService, LoginResponse, LoginState, RefreshResponse, Token,
        TokenPersist, TokenStore } from './';

/**
 * This service class manages the JWT authentication, the session and the current login state.
 */
export class JwtService implements IAuthenticationService {

    private readonly _visitorName: string = 'BuiltIn\\Visitor';

    /**
     * Returns the current user's name as a string. In case of unauthenticated users, it will return 'BuiltIn\Visitor'
     */
    public get CurrentUser(): string {
        if (this._tokenStore.AccessToken.IsValid() || this._tokenStore.RefreshToken.IsValid()) {
            return this._tokenStore.AccessToken.Username || this._tokenStore.RefreshToken.Username;
        }
        return this._visitorName;
    }
    /**
     * This observable indicates the current state of the service
     * @default LoginState.Pending
     */
    public get State(): Observable<LoginState> {
        return this._stateSubject.distinctUntilChanged();
    }

    /**
     * Gets the current state of the service
     * @default LoginState.Pending
     */
    public get CurrentState(): LoginState {
        return this._stateSubject.getValue();
    }

    /**
     * The private subject for tracking the login state
     */
    private readonly _stateSubject: BehaviorSubject<LoginState> = new BehaviorSubject<LoginState>(LoginState.Pending);

    /**
     * The store for JWT tokens
     */
    private _tokenStore: TokenStore =
        new TokenStore(this._repository.Config.RepositoryUrl, this._repository.Config.JwtTokenKeyTemplate, (this._repository.Config.JwtTokenPersist === 'session') ? TokenPersist.Session : TokenPersist.Expiration);

    /**
     * Executed before each Ajax call. If the access token has been expired, but the refresh token is still valid, it triggers the token refreshing call
     * @returns {Observable<boolean>} An observable with a variable that indicates if there was a refresh triggered.
     */
    public CheckForUpdate(): Observable<boolean> {
        if (this._tokenStore.AccessToken.IsValid()) {
            this._stateSubject.next(LoginState.Authenticated);
            return Observable.from([false]);
        }
        if (!this._tokenStore.RefreshToken.IsValid()) {
            this._stateSubject.next(LoginState.Unauthenticated);
            return Observable.from([false]);
        }
        this._stateSubject.next(LoginState.Pending);
        return this.execTokenRefresh();
    }

    /**
     * Executes the token refresh call. Refresh the token in the Token Store and in the Service, updates the HttpService header
     * @returns {Observable<boolean>} An observable that will be completed with true on a succesfull refresh
     */
    private execTokenRefresh() {
        const refresh = this._repository.HttpProviderRef.Ajax(RefreshResponse, {
            method: 'POST',
            url: ODataHelper.joinPaths(this._repository.Config.RepositoryUrl, 'sn-token/refresh'),
            headers: {
                'X-Refresh-Data': this._tokenStore.RefreshToken.toString(),
                'X-Authentication-Type': 'Token',
            },
        });

        refresh.subscribe((response) => {
            this._tokenStore.AccessToken = Token.FromHeadAndPayload(response.access);
            this._stateSubject.next(LoginState.Authenticated);
        }, (err) => {
            this._stateSubject.next(LoginState.Unauthenticated);
        });

        return refresh.map((response) => true);
    }

    /**
     * @param {BaseRepository} _repository the Repository reference for the Authentication. The service will read its configuration and use its HttpProvider
     * @constructs JwtService
     */
    constructor(protected readonly _repository: BaseRepository) {

        this._stateSubject = new BehaviorSubject<LoginState>(LoginState.Pending);

        this.State.subscribe((s) => {
            if (this._tokenStore.AccessToken.IsValid()) {
                this._repository.HttpProviderRef.SetGlobalHeader('X-Access-Data', this._tokenStore.AccessToken.toString());
            } else {
                this._repository.HttpProviderRef.UnsetGlobalHeader('X-Access-Data');
            }
        });
        this.CheckForUpdate();
    }

    private handleAuthenticationResponse(response: LoginResponse): boolean {
        this._tokenStore.AccessToken = Token.FromHeadAndPayload(response.access);
        this._tokenStore.RefreshToken = Token.FromHeadAndPayload(response.refresh);
        if (this._tokenStore.AccessToken.IsValid()) {
            this._stateSubject.next(LoginState.Authenticated);
            return true;
        }
        this._stateSubject.next(LoginState.Unauthenticated);
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
        const sub = new Subject<boolean>();

        this._stateSubject.next(LoginState.Pending);
        const authToken: string = new Buffer(`${username}:${password}`).toString('base64');

        this._repository.HttpProviderRef.Ajax(LoginResponse, {
            method: 'POST',
            url: ODataHelper.joinPaths(this._repository.Config.RepositoryUrl, 'sn-token/login'),
            headers: {
                'X-Authentication-Type': 'Token',
                'Authorization': `Basic ${authToken}`,
            },
        })
            .subscribe((r) => {
                const result = this.handleAuthenticationResponse(r);
                sub.next(result);
            }, (err) => {
                this._stateSubject.next(LoginState.Unauthenticated);
                sub.next(false);
            });

        return sub.asObservable();
    }

    /**
     * Logs out the current user, sets the tokens to 'empty' and sends a Logout request to invalidate all Http only cookies
     * @returns {Observable<boolean>} An Observable that will be updated with the logout response
     */
    public Logout(): Observable<boolean> {
        this._tokenStore.AccessToken = Token.CreateEmpty();
        this._tokenStore.RefreshToken = Token.CreateEmpty();
        this._stateSubject.next(LoginState.Unauthenticated);

        return this._repository.HttpProviderRef.Ajax(LoginResponse, {
            method: 'POST',
            url: ODataHelper.joinPaths(this._repository.Config.RepositoryUrl, 'sn-token/logout'),
        }).map(() => true);

    }
}
