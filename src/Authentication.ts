import { Repository } from './SN';
import { Subject, BehaviorSubject } from '@reactivex/rxjs';
import { Observable } from '@reactivex/rxjs';

export enum LoginState {
    Pending,
    Unauthenticated,
    Authenticated
}

type TokenType = 'access' | 'refresh';

class LoginResponse {
    access: string;
    refresh: string;
}

class RefreshResponse {
    access: string;
}

interface IToken {
    iss: string;
    sub: string;
    aud: string;
    exp: number;
    iat: number;
    nbf: number;
    name: string;
}

class Token {
    private fromEpoch(epoch: number): Date {
        let d = new Date(0);
        d.setUTCSeconds(epoch);
        return d;
    }

    public get Username(): string {
        return this.tokenData.name;
    };

    public GetData() {
        return this.tokenData;
    }

    public get ExpirationTime() {
        return this.fromEpoch(this.tokenData.exp);
    }

    public get NotBefore() {
        return this.fromEpoch(this.tokenData.nbf);
    }

    public IsValid() {
        let now = new Date();
        return this.tokenData && this.ExpirationTime > now && this.NotBefore < now;
    }

    public get IssuedDate() {
        return this.fromEpoch(this.tokenData.iat);
    }
    constructor(private readonly tokenData: IToken) { }
}

class TokenStore {
    constructor(private readonly baseUrl: string) {
    }

    private get tokenKeyPrefix() {
        return `sn-${this.baseUrl}-`;
    }

    private innerStore: string[] = [];
    public GetToken(key: TokenType): Token {
        const storeKey = `${this.tokenKeyPrefix}${key}`;
        try {
            if (typeof localStorage === 'undefined') {
                return new Token(JSON.parse(this.innerStore[storeKey]));
            }
            return new Token(JSON.parse(localStorage.getItem(storeKey)));
        } catch (err) {
            return new Token({
                exp: 0,
                aud: '',
                iat: 0,
                iss: '',
                name: '',
                nbf: 0,
                sub: ''
            });
        }
    }

    public SetToken(key: TokenType, token: Token) {
        const storeKey = `${this.tokenKeyPrefix}${key}`;
        let dtaString = JSON.stringify(token.GetData());
        if (typeof localStorage === 'undefined') {
            this.innerStore[storeKey] = dtaString;
        } else {
            localStorage.setItem(storeKey, dtaString);
        }
    }

    public get AccessToken() {
        return this.GetToken('access');
    }
    public set AccessToken(value: Token) {
        this.SetToken('access', value);
    }

    public get RefreshToken() {
        return this.GetToken('refresh');
    }
    public set RefreshToken(value: Token) {
        this.SetToken('refresh', value);
    }

}

export class Authentication {

    public readonly State: BehaviorSubject<LoginState> = new BehaviorSubject<LoginState>(LoginState.Pending);

    private TokenStore = new TokenStore(this.repository.baseUrl);
    private accessToken: Token;
    private refreshToken: Token;

    public CheckForUpdate() {
        if (this.accessToken.IsValid() || !this.refreshToken.IsValid()) {
            return Observable.from([true]);
        } else {
            this.State.next(LoginState.Pending);
        }
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

        let accessBuffer = Buffer.from(response.access.split('.')[1], 'base64');
        // ToDo: Store payload
        this.TokenStore.AccessToken = new Token(JSON.parse(accessBuffer.toString()) as IToken)
        let refreshBuffer = Buffer.from(response.refresh.split('.')[1], 'base64');
        // ToDo: Store payload
        this.TokenStore.RefreshToken = new Token(JSON.parse(refreshBuffer.toString()) as IToken)

        if (this.TokenStore.AccessToken.IsValid()) {
            this.State.next(LoginState.Authenticated);
            return true;
        }

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
    public Logout() {
        return this.repository.Ajax(`('Root')/Logout&nocache=${new Date().getTime()}`, 'POST', Boolean);
    }
}