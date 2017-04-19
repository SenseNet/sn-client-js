"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("@reactivex/rxjs");
const rxjs_2 = require("@reactivex/rxjs");
var LoginState;
(function (LoginState) {
    LoginState[LoginState["Pending"] = 0] = "Pending";
    LoginState[LoginState["Unauthenticated"] = 1] = "Unauthenticated";
    LoginState[LoginState["Authenticated"] = 2] = "Authenticated";
})(LoginState = exports.LoginState || (exports.LoginState = {}));
class LoginResponse {
}
class RefreshResponse {
}
class Token {
    constructor(headerEncoded, payloadEncoded) {
        this.headerEncoded = headerEncoded;
        this.payloadEncoded = payloadEncoded;
    }
    get tokenPayload() {
        try {
            return JSON.parse(Buffer.from(this.payloadEncoded, 'base64').toString());
        }
        catch (err) {
            return {
                aud: '',
                exp: 0,
                iat: 0,
                iss: '',
                name: '',
                nbf: 0,
                sub: ''
            };
        }
    }
    ;
    fromEpoch(epoch) {
        let d = new Date(0);
        d.setUTCSeconds(epoch);
        return d;
    }
    get Username() {
        return this.tokenPayload.name;
    }
    ;
    GetPayload() {
        return this.tokenPayload;
    }
    get ExpirationTime() {
        return this.fromEpoch(this.tokenPayload.exp);
    }
    get NotBefore() {
        return this.fromEpoch(this.tokenPayload.nbf);
    }
    IsValid() {
        let now = new Date();
        return this.tokenPayload && this.ExpirationTime > now && this.NotBefore < now;
    }
    get IssuedDate() {
        return this.fromEpoch(this.tokenPayload.iat);
    }
    toString() {
        return `${this.headerEncoded}.${this.payloadEncoded}`;
    }
    static FromHeadAndPayload(headAndPayload) {
        let [head, payload] = headAndPayload.split('.');
        return new Token(head, payload);
    }
    static get Empty() {
        return new Token('', '');
    }
}
class TokenStore {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
        this.innerStore = [];
    }
    get tokenKeyPrefix() {
        return `sn-${this.baseUrl}-`;
    }
    GetToken(key) {
        const storeKey = `${this.tokenKeyPrefix}${key}`;
        try {
            if (typeof localStorage === 'undefined') {
                return Token.FromHeadAndPayload(this.innerStore[storeKey]);
            }
            return Token.FromHeadAndPayload(localStorage.getItem(storeKey));
        }
        catch (err) {
            return Token.Empty;
        }
    }
    SetToken(key, token) {
        const storeKey = `${this.tokenKeyPrefix}${key}`;
        let dtaString = token.toString();
        if (typeof localStorage === 'undefined') {
            this.innerStore[storeKey] = dtaString;
        }
        else {
            localStorage.setItem(storeKey, dtaString);
        }
    }
    get AccessToken() {
        return this.GetToken('access');
    }
    set AccessToken(value) {
        this.SetToken('access', value);
    }
    get RefreshToken() {
        return this.GetToken('refresh');
    }
    set RefreshToken(value) {
        this.SetToken('refresh', value);
    }
}
class Authentication {
    constructor(repository) {
        this.repository = repository;
        this.State = new rxjs_1.BehaviorSubject(LoginState.Pending);
        this.TokenStore = new TokenStore(this.repository.baseUrl);
        this.accessToken = Token.Empty;
        this.refreshToken = Token.Empty;
        this.State.subscribe(s => {
            console.log(`SN Login state: '${LoginState[s]}'`);
        });
        this.accessToken = this.TokenStore.AccessToken;
        this.refreshToken = this.TokenStore.RefreshToken;
        if (this.accessToken.IsValid()) {
            this.State.next(LoginState.Authenticated);
        }
        else {
            if (this.refreshToken.IsValid()) {
                this.CheckForUpdate();
            }
            else {
                this.State.next(LoginState.Unauthenticated);
            }
        }
    }
    CheckForUpdate() {
        if (this.accessToken.IsValid() || !this.refreshToken.IsValid()) {
            return rxjs_2.Observable.from([false]);
        }
        else {
            this.State.next(LoginState.Pending);
            return this.ExecTokenRefresh();
        }
    }
    ExecTokenRefresh() {
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
        return refresh.map(response => { return true; });
    }
    handleAuthenticationResponse(response) {
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
    Login(username, password) {
        let sub = new rxjs_1.Subject();
        this.State.next(LoginState.Pending);
        let authToken = new Buffer(`${username}:${password}`).toString('base64');
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
    Logout() {
        this.TokenStore.AccessToken = Token.Empty;
        this.TokenStore.RefreshToken = Token.Empty;
    }
}
exports.Authentication = Authentication;
//# sourceMappingURL=Authentication.js.map