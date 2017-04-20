"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ODataRequestOptions {
    constructor(options) {
        this.params = options.params || [];
        this.path = `${options.path}`;
        this.async = options.async || true;
        this.type = options.type || 'GET';
        this.success = options.success;
        this.error = options.error;
        this.complete = options.complete;
    }
}
exports.ODataRequestOptions = ODataRequestOptions;
//# sourceMappingURL=ODataRequestOptions.js.map