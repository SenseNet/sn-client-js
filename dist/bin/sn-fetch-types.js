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
const Http = require("http");
const AdmZip = require("adm-zip");
class SnConfig {
}
const SN_REPOSITORY_URL_POSTFIX = '/Root/System/Schema/Metadata/TypeScript/meta.zip';
const SN_CONFIG_NAME = 'sn.config.js';
const SN_TEMPDIR_NAME = 'sntmp';
class Config {
    static ReadConfigFile() {
        return __awaiter(this, void 0, void 0, function* () {
            let cfg;
            try {
                cfg = require(cwd + Path.sep + SN_CONFIG_NAME);
            }
            catch (error) {
                console.log(`No '${SN_CONFIG_NAME}' file found in the project root.`);
                cfg = new SnConfig();
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
class TypeDownloader {
    static Fetch(cfg) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                let filePath = `./${SN_TEMPDIR_NAME}/meta.zip`;
                let auth = 'Basic ' + new Buffer(`${cfg.UserName}:${cfg.Password}`).toString('base64');
                let headers = {
                    'Authorization': auth,
                };
                Http.get({
                    host: cfg.RepositoryUrl,
                    path: SN_REPOSITORY_URL_POSTFIX,
                    headers: headers,
                }, (response) => {
                    if (response.readable) {
                        let data = [];
                        let contentLength = parseInt(response.headers['content-length']);
                        response.on('data', chunk => {
                            data.push(chunk);
                        });
                        response.on('end', () => {
                            let pos = 0;
                            let buffer = new Buffer(contentLength);
                            data.forEach(chunk => {
                                chunk.copy(buffer, pos);
                                pos += chunk.length;
                            });
                            resolve(buffer);
                        });
                    }
                    else {
                        reject();
                    }
                });
            });
        });
    }
}
console.log('Sn-Fetch-Types starting...');
let path = Path.parse(__dirname);
let cwd = process.cwd();
console.log(`The current working directory is: ${cwd}`);
console.log('Reading Config file...');
let cfg = Config.Create().then((cfg) => __awaiter(this, void 0, void 0, function* () {
    let zipBuffer = yield TypeDownloader.Fetch(cfg);
    let zip = new AdmZip(zipBuffer);
    process.exit(0);
}));

//# sourceMappingURL=sn-fetch-types.js.map
