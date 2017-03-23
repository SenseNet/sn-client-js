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
const AdmZip = require("adm-zip");
const Path = require("path");
const SN_REPOSITORY_URL_POSTFIX = '/Root/System/Schema/Metadata/TypeScript/meta.zip';
(() => __awaiter(this, void 0, void 0, function* () {
    console.log('Sn-Fetch-Types starting...');
    console.log('Checking sn.config.js...');
    let cfg = yield new utils_1.ConfigReader(process.cwd())
        .ValidateAsync([
        ['RepositoryUrl', 'Please enter your Sense/Net Site URL(e.g.:demo.sensenet.com): '],
        ['UserName', 'Please enter the admin username: '],
        ['Password', 'Please enter the password for the user: ']
    ]);
    console.log('Downloading type definitions...');
    let zipBuffer = yield new utils_1.Download(cfg.RepositoryUrl, SN_REPOSITORY_URL_POSTFIX)
        .Authenticate(cfg.UserName, cfg.Password)
        .GetAsBufferAsync();
    let zip = new AdmZip(zipBuffer);
    console.log('Download completed, extracting...');
    zip.extractAllTo(`${__dirname}${Path.sep}..${Path.sep}..${Path.sep}src`, true);
    console.log('Files extracted, running Build...');
    let result = new utils_1.NpmExecutor(__dirname).Run('gulp');
    console.log('All done.');
    process.exit(0);
}))();
//# sourceMappingURL=index.js.map