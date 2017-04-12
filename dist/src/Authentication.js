"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Authentication {
    constructor(repository) {
        this.repository = repository;
    }
    Login(username, password) {
        let authToken = new Buffer(`${username}:${password}`).toString('base64');
        return this.repository.httpProviderRef.Ajax(Object, {
            method: 'POST',
            url: this.repository.ODataBaseUrl,
            headers: {
                'X-Authentication-Type': 'Token',
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