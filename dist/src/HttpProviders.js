"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("@reactivex/rxjs");
var HttpProviders;
(function (HttpProviders) {
    class Base {
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
    HttpProviders.Base = Base;
    class Mock extends Base {
        AjaxInner(tReturnType, options) {
            let subject = new rxjs_1.ReplaySubject();
            subject.next({});
            console.log('MockHttp executed: ', options.url);
            return subject.asObservable();
        }
    }
    HttpProviders.Mock = Mock;
    class RxAjax extends Base {
        AjaxInner(tReturnType, options) {
            let observable = rxjs_1.Observable.ajax(options).share().map(req => {
                return req.response;
            });
            return observable;
        }
    }
    HttpProviders.RxAjax = RxAjax;
})(HttpProviders = exports.HttpProviders || (exports.HttpProviders = {}));
//# sourceMappingURL=HttpProviders.js.map