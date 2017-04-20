"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require("./");
const SN_1 = require("../SN");
class SnTestRepository extends _1.BaseRepository {
    constructor(baseUrl, serviceToken) {
        super(SN_1.HttpProviders.MockHttpProvider, baseUrl, serviceToken);
    }
}
exports.SnTestRepository = SnTestRepository;
//# sourceMappingURL=SnTestRepository.js.map