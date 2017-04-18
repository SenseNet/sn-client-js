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
    constructor(tokenData) {
        this.tokenData = tokenData;
    }
    fromEpoch(epoch) {
        let d = new Date(0);
        d.setUTCSeconds(epoch);
        return d;
    }
    get Username() {
        return this.tokenData.name;
    }
    ;
    GetData() {
        return this.tokenData;
    }
    get ExpirationTime() {
        return this.fromEpoch(this.tokenData.exp);
    }
    get NotBefore() {
        return this.fromEpoch(this.tokenData.nbf);
    }
    IsValid() {
        let now = new Date();
        return this.tokenData && this.ExpirationTime > now && this.NotBefore < now;
    }
    get IssuedDate() {
        return this.fromEpoch(this.tokenData.iat);
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
                return new Token(JSON.parse(this.innerStore[storeKey]));
            }
            return new Token(JSON.parse(localStorage.getItem(storeKey)));
        }
        catch (err) {
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
    SetToken(key, token) {
        const storeKey = `${this.tokenKeyPrefix}${key}`;
        let dtaString = JSON.stringify(token.GetData());
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
                console.log('Token refresh needed.');
            }
            else {
                this.State.next(LoginState.Unauthenticated);
            }
        }
    }
    CheckForUpdate() {
        if (this.accessToken.IsValid() || !this.refreshToken.IsValid()) {
            return rxjs_2.Observable.from([true]);
        }
        else {
            this.State.next(LoginState.Pending);
        }
    }
    handleAuthenticationResponse(response) {
        let accessBuffer = Buffer.from(response.access.split('.')[1], 'base64');
        this.TokenStore.AccessToken = new Token(JSON.parse(accessBuffer.toString()));
        let refreshBuffer = Buffer.from(response.refresh.split('.')[1], 'base64');
        this.TokenStore.RefreshToken = new Token(JSON.parse(refreshBuffer.toString()));
        if (this.TokenStore.AccessToken.IsValid()) {
            this.State.next(LoginState.Authenticated);
            return true;
        }
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
        return this.repository.Ajax(`('Root')/Logout&nocache=${new Date().getTime()}`, 'POST', Boolean);
    }
}
exports.Authentication = Authentication;
//# sourceMappingURL=Authentication.js.map