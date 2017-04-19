"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require("./");
const rxjs_1 = require("@reactivex/rxjs");
class Authentication {
    constructor(repository) {
        this.repository = repository;
        this.State = new rxjs_1.BehaviorSubject(_1.LoginState.Pending);
        this.TokenStore = new _1.TokenStore(this.repository.baseUrl);
        this.accessToken = _1.Token.Empty;
        this.refreshToken = _1.Token.Empty;
        this.State.subscribe(s => {
            console.log(`SN Login state: '${_1.LoginState[s]}'`);
        });
        this.accessToken = this.TokenStore.AccessToken;
        this.refreshToken = this.TokenStore.RefreshToken;
        if (this.accessToken.IsValid()) {
            this.State.next(_1.LoginState.Authenticated);
        }
        else {
            if (this.refreshToken.IsValid()) {
                this.CheckForUpdate();
            }
            else {
                this.State.next(_1.LoginState.Unauthenticated);
            }
        }
    }
    CheckForUpdate() {
        if (this.accessToken.IsValid() || !this.refreshToken.IsValid()) {
            return rxjs_1.Observable.from([false]);
        }
        else {
            this.State.next(_1.LoginState.Pending);
            return this.ExecTokenRefresh();
        }
    }
    ExecTokenRefresh() {
        let refreshBase64 = this.refreshToken.toString();
        let refresh = this.repository.httpProviderRef.Ajax(_1.RefreshResponse, {
            method: 'POST',
            url: `${this.repository.baseUrl}sn-token/refresh`,
            headers: {
                'X-Refresh-Data': this.refreshToken.toString(),
                'X-Authentication-Type': 'Token'
            }
        });
        refresh.subscribe(response => {
            this.TokenStore.AccessToken = _1.Token.FromHeadAndPayload(response.access);
            this.accessToken = this.TokenStore.AccessToken;
            this.repository.httpProviderRef.SetGlobalHeader('X-Access-Data', response.access);
            this.State.next(_1.LoginState.Authenticated);
        }, err => {
            console.warn(`There was an error during token refresh: ${err}`);
            this.State.next(_1.LoginState.Unauthenticated);
        });
        return refresh.map(response => { return true; });
    }
    handleAuthenticationResponse(response) {
        this.TokenStore.AccessToken = _1.Token.FromHeadAndPayload(response.access);
        this.TokenStore.RefreshToken = _1.Token.FromHeadAndPayload(response.refresh);
        if (this.TokenStore.AccessToken.IsValid()) {
            this.State.next(_1.LoginState.Authenticated);
            return true;
        }
        this.repository.httpProviderRef.SetGlobalHeader('X-Access-Data', response.access);
        this.State.next(_1.LoginState.Unauthenticated);
        return false;
    }
    Login(username, password) {
        let sub = new rxjs_1.Subject();
        this.State.next(_1.LoginState.Pending);
        let authToken = new Buffer(`${username}:${password}`).toString('base64');
        this.repository.httpProviderRef.Ajax(_1.LoginResponse, {
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
            this.State.next(_1.LoginState.Unauthenticated);
            sub.next(false);
        });
        return sub.asObservable();
    }
    Logout() {
        this.TokenStore.AccessToken = _1.Token.Empty;
        this.TokenStore.RefreshToken = _1.Token.Empty;
    }
}
exports.Authentication = Authentication;
//# sourceMappingURL=Authentication.js.map