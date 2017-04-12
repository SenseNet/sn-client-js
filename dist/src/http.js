"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("@reactivex/rxjs");
var Http;
(function (Http) {
    class BaseHttpProvider {
        constructor() {
            this.headers = [];
        }
        SetGlobalHeader(headerName, headerValue) {
            this.headers[headerName] = headerValue;
        }
        Ajax(tReturnType, options) {
            this.headers.forEach((value, key) => {
                options.headers[key] = value;
            });
            return this.AjaxInner(tReturnType, options);
        }
        ;
    }
    Http.BaseHttpProvider = BaseHttpProvider;
    class MockAjaxHttpProvider extends BaseHttpProvider {
        AjaxInner(tReturnType, options) {
            let subject = new rxjs_1.ReplaySubject();
            subject.next({});
            return subject.asObservable();
        }
    }
    Http.MockAjaxHttpProvider = MockAjaxHttpProvider;
    class RxAjaxHttpProvider extends BaseHttpProvider {
        AjaxInner(tReturnType, options) {
            let observable = rxjs_1.Observable.ajax(options).share().map(req => {
                return req.response;
            });
            return observable;
        }
    }
    Http.RxAjaxHttpProvider = RxAjaxHttpProvider;
})(Http = exports.Http || (exports.Http = {}));
//# sourceMappingURL=Http.js.map