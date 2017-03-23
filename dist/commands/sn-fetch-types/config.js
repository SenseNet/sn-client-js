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
class SnConfig {
}
class Config {
    constructor(projectDirectory) {
        this.projectDirectory = projectDirectory;
    }
    ReadConfigFile() {
        return __awaiter(this, void 0, void 0, function* () {
            let cfg;
            try {
                cfg = require(this.projectDirectory + Path.sep + SN_CONFIG_NAME);
            }
            catch (error) {
                console.log(`No '${SN_CONFIG_NAME}' file found in the project root.`);
                cfg = new SnConfig();
            }
            return cfg;
        });
    }
    FinializeAsync() {
        return __awaiter(this, void 0, void 0, function* () {
            let cfg = yield this.ReadConfigFile();
            if (!cfg.RepositoryUrl) {
                cfg.RepositoryUrl = yield utils_1.Ask.TextAsync('Please enter your Sense/Net Site URL(e.g.: http://www.my-awesome-sensenet-portal.net/');
            }
            if (!cfg.UserName) {
                cfg.UserName = yield utils_1.Ask.TextAsync('Please enter the admin username: ');
            }
            if (!cfg.Password) {
                cfg.Password = yield utils_1.Ask.PasswordAsync('Please enter the admin password: ');
            }
            return cfg;
        });
    }
}
exports.Config = Config;
//# sourceMappingURL=config.js.map