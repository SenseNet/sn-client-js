"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require("./");
const SN_1 = require("../SN");
class SnRepository extends _1.BaseRepository {
    constructor(baseUrl, serviceToken) {
        super(SN_1.HttpProviders.RxAjaxHttpProvider, baseUrl, serviceToken);
    }
}
exports.SnRepository = SnRepository;
//# sourceMappingURL=SnRepository.js.map