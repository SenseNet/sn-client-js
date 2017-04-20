"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("@reactivex/rxjs");
const _1 = require("./");
class RxAjaxHttpProvider extends _1.BaseHttpProvider {
    AjaxInner(tReturnType, options) {
        let observable = rxjs_1.Observable.ajax(options).share().map(req => {
            return req.response;
        });
        return observable;
    }
}
exports.RxAjaxHttpProvider = RxAjaxHttpProvider;
//# sourceMappingURL=RxAjaxHttpProvider.js.map