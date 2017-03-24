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
const _1 = require("./");
const _2 = require("../");
const Path = require("path");
const SN_CONFIG_NAME = 'sn.config.js';
class SnConfigReader {
    constructor(projectDirectory) {
        this.projectDirectory = projectDirectory;
        this.config = new _1.SnConfigModel;
    }
    ReadConfigFile() {
        return __awaiter(this, void 0, void 0, function* () {
            let cfg;
            try {
                cfg = require(this.projectDirectory + Path.sep + SN_CONFIG_NAME);
            }
            catch (error) {
                console.log(`No '${SN_CONFIG_NAME}' file found in the project root.`);
                cfg = new _1.SnConfigModel();
            }
            this.config = cfg;
        });
    }
    ValidateAsync(...requiredValues) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.ReadConfigFile();
            for (let fieldName of requiredValues) {
                let fieldModel = _1.SnConfigFieldModelStore.Get(fieldName);
                let value = this.config[fieldModel.FieldName];
                if (!value || !value.length || !(fieldModel.Behavior & _1.SnConfigBehavior.AllowFromConfig)) {
                    this.config[fieldModel.FieldName] =
                        (fieldModel.Behavior & _1.SnConfigBehavior.HideConsoleInput)
                            ?
                                yield _2.Ask.PasswordAsync(fieldModel.Question) :
                            yield _2.Ask.TextAsync(fieldModel.Question);
                }
            }
            return this.config;
        });
    }
}
exports.SnConfigReader = SnConfigReader;
//# sourceMappingURL=snconfigreader.js.map