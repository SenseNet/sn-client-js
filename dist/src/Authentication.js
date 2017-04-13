"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("@reactivex/rxjs");
var LoginState;
(function (LoginState) {
    LoginState[LoginState["Pending"] = 0] = "Pending";
    LoginState[LoginState["Unauthenticated"] = 1] = "Unauthenticated";
    LoginState[LoginState["Authenticated"] = 2] = "Authenticated";
})(LoginState = exports.LoginState || (exports.LoginState = {}));
class Authentication {
    constructor(repository) {
        this.repository = repository;
        this.State = new rxjs_1.BehaviorSubject(LoginState.Pending);
    }
    Login(username, password) {
        this.State.next(LoginState.Pending);
        let authToken = new Buffer(`${username}:${password}`).toString('base64');
        return this.repository.httpProviderRef.Ajax(Object, {
            method: 'POST',
            url: `${this.repository.baseUrl}sn-token/login`,
            headers: {
                'Authorization': `Basic ${authToken}`
            }
        });
    }
    Logout() {
        return this.repository.Ajax(`('Root')/Logout&nocache=${new Date().getTime()}`, 'POST', Boolean);
    }
}
exports.Authentication = Authentication;
//# sourceMappingURL=Authentication.js.map