"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("@reactivex/rxjs");
var Http;
(function (Http) {
    class RxObservableHttpProvider {
        Ajax(tReturnType, options) {
            return rxjs_1.Observable.ajax(options).share().map(req => req.response.json);
        }
    }
    Http.RxObservableHttpProvider = RxObservableHttpProvider;
    class RxPromiseHttpProvder {
        Ajax(tReturnType, options) {
            return rxjs_1.Observable.ajax(options)
                .map(req => req.response.json)
                .toPromise();
        }
    }
    Http.RxPromiseHttpProvder = RxPromiseHttpProvder;
})(Http = exports.Http || (exports.Http = {}));
//# sourceMappingURL=Http.js.map