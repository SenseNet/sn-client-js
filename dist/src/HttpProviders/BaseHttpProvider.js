"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
exports.BaseHttpProvider = BaseHttpProvider;
//# sourceMappingURL=BaseHttpProvider.js.map