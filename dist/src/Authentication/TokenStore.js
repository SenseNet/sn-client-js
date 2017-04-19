"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require("./");
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
                return _1.Token.FromHeadAndPayload(this.innerStore[storeKey]);
            }
            return _1.Token.FromHeadAndPayload(localStorage.getItem(storeKey));
        }
        catch (err) {
            return _1.Token.Empty;
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
exports.TokenStore = TokenStore;
//# sourceMappingURL=TokenStore.js.map