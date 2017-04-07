"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("@reactivex/rxjs");
var Http;
(function (Http) {
    class RxObservableHttpProvider {
        Ajax(options) {
            return rxjs_1.Observable.ajax(options).share();
        }
    }
    Http.RxObservableHttpProvider = RxObservableHttpProvider;
    class Provider {
        constructor(_providerInstance) {
            this._providerInstance = _providerInstance;
        }
        static Create(providerType) {
            let providerInstance = new providerType();
            let current = new Provider(providerInstance);
            return current;
        }
        ApplyGlobalHeader(name, value) {
            this.headers.push({ name, value });
        }
        Ajax(options) {
            return this._providerInstance.Ajax(options);
        }
    }
    Http.Provider = Provider;
})(Http = exports.Http || (exports.Http = {}));
//# sourceMappingURL=Http.js.map