"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
const Path = require("path");
const SN_CONFIG_NAME = 'sn.config.js';
class ConfigReader {
    constructor(projectDirectory) {
        this.projectDirectory = projectDirectory;
        this.config = new utils_1.SnConfigModel;
    }
    ReadConfigFile() {
        return __awaiter(this, void 0, void 0, function* () {
            let cfg;
            try {
                cfg = require(this.projectDirectory + Path.sep + SN_CONFIG_NAME);
            }
            catch (error) {
                console.log(`No '${SN_CONFIG_NAME}' file found in the project root.`);
                cfg = new utils_1.SnConfigModel();
            }
            this.config = cfg;
        });
    }
    ValidateAsync(requiredValues) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.ReadConfigFile();
            for (let requiredValue of requiredValues) {
                let value = this.config[requiredValue[0]];
                if (!value || !value.length) {
                    this.config[requiredValue[0]] = yield utils_1.Ask.TextAsync(requiredValue[1]);
                }
            }
            return this.config;
        });
    }
}
exports.ConfigReader = ConfigReader;
//# sourceMappingURL=configreader.js.map