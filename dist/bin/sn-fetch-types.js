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
const Path = require("path");
const Prompt = require("prompt");
class SnConfig {
}
const REPOSITORY_URL_POSTFIX = 'Root/System/Schema/Metadata/TypeScript/meta.zip';
class Config {
    static ReadConfigFile() {
        return __awaiter(this, void 0, void 0, function* () {
            let cfg;
            try {
                cfg = require(cwd + Path.sep + 'sn.config.js');
            }
            catch (error) {
                console.log('There was an error opening sn.config.js: ', error);
            }
            return cfg;
        });
    }
    static Ask(question, hide = false) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                Prompt.start();
                Prompt.get([
                    {
                        name: question,
                        required: true,
                        hidden: hide
                    }
                ], (err, res) => {
                    resolve(res[question]);
                });
            });
        });
    }
    static Create() {
        return __awaiter(this, void 0, void 0, function* () {
            let cfg = yield this.ReadConfigFile();
            if (!cfg.RepositoryUrl) {
                cfg.RepositoryUrl = yield this.Ask('Please enter your Sense/Net Site URL(e.g.: http://www.my-awesome-sensenet-portal.net/');
            }
            if (!cfg.UserName) {
                cfg.UserName = yield this.Ask('Please enter the admin username: ');
            }
            if (!cfg.Password) {
                cfg.Password = yield this.Ask('Please enter the admin password: ', true);
            }
            return cfg;
        });
    }
}
console.log('Sn-Fetch-Types starting...');
let path = Path.parse(__dirname);
let cwd = process.cwd();
console.log(`The current working directory is: ${cwd}`);
console.log('Reading Config file...');
let cfg = Config.Create().then(cfg => {
    console.log(cfg);
    process.exit(0);
});

//# sourceMappingURL=sn-fetch-types.js.map
