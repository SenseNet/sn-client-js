"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("@reactivex/rxjs");
const _1 = require("./");
class MockHttpProvider extends _1.BaseHttpProvider {
    AjaxInner(tReturnType, options) {
        let subject = new rxjs_1.ReplaySubject();
        subject.next({});
        console.log('MockHttp executed: ', options.url);
        return subject.asObservable();
    }
}
exports.MockHttpProvider = MockHttpProvider;
//# sourceMappingURL=MockHttpProvider.js.map