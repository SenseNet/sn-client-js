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
const snconfig_1 = require("./utils/snconfig");
const utils_1 = require("./utils");
const AdmZip = require("adm-zip");
const Path = require("path");
const SN_REPOSITORY_URL_POSTFIX = '/Root/System/Schema/Metadata/TypeScript/meta.zip';
(() => __awaiter(this, void 0, void 0, function* () {
    console.log('Sn-Fetch-Types starting...');
    let pathHelper = new utils_1.PathHelper(process.cwd(), `${__dirname}${Path.sep}..`);
    let stage = new utils_1.Stage(pathHelper);
    yield stage.PrepareAsync();
    console.log('Checking sn.config.js...');
    let cfg = yield new snconfig_1.SnConfigReader(pathHelper.SnClientPath)
        .ValidateAsync('RepositoryUrl', 'UserName', 'Password');
    console.log('Downloading type definitions...');
    let zipBuffer = yield new utils_1.Download(cfg.RepositoryUrl, SN_REPOSITORY_URL_POSTFIX)
        .Authenticate(cfg.UserName, cfg.Password)
        .GetAsBufferAsync();
    let zip = new AdmZip(zipBuffer);
    console.log('Download completed, extracting...');
    zip.extractAllTo(stage.TempFolderPath + Path.sep + 'src', true);
    console.log('Files extracted, running Build...');
    console.log('All done.');
    process.exit(0);
}))();
//# sourceMappingURL=sn-fetch-types.js.map