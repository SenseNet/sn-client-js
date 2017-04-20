"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ODataParams {
    constructor(options) {
        this.expand = null;
        this.select = options.select;
        this.expand = options.expand;
        this.orderby = options.orderby;
        this.top = options.top;
        this.skip = options.skip;
        this.filter = options.filter;
        this.format = options.filter;
        this.inlinecount = options.inlinecount;
        this.query = options.query;
        this.metadata = options.metadata;
        this.data = options.data || [];
    }
}
exports.ODataParams = ODataParams;
//# sourceMappingURL=ODataParams.js.map