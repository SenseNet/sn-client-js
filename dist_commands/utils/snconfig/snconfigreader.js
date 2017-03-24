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
const snconfigmodel_1 = require("./snconfigmodel");
const snconfigfieldmodelstore_1 = require("./snconfigfieldmodelstore");
const snconfigbehavior_1 = require("./snconfigbehavior");
const ask_1 = require("../ask");
const Path = require("path");
const SN_CONFIG_NAME = 'sn.config.js';
class SnConfigReader {
    constructor(projectDirectory) {
        this.projectDirectory = projectDirectory;
        this.config = new snconfigmodel_1.SnConfigModel;
    }
    ReadConfigFile() {
        return __awaiter(this, void 0, void 0, function* () {
            let cfg;
            try {
                cfg = require(this.projectDirectory + Path.sep + SN_CONFIG_NAME);
            }
            catch (error) {
                console.log(`No '${SN_CONFIG_NAME}' file found in the project root.`);
                cfg = new snconfigmodel_1.SnConfigModel();
            }
            this.config = cfg;
        });
    }
    ValidateAsync(...requiredValues) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.ReadConfigFile();
            for (let fieldName of requiredValues) {
                let fieldModel = snconfigfieldmodelstore_1.SnConfigFieldModelStore.Get(fieldName);
                let value = this.config[fieldModel.FieldName];
                if (!value || !value.length || !(fieldModel.Behavior & snconfigbehavior_1.SnConfigBehavior.AllowFromConfig)) {
                    this.config[fieldModel.FieldName] =
                        (fieldModel.Behavior & snconfigbehavior_1.SnConfigBehavior.HideConsoleInput)
                            ?
                                yield ask_1.Ask.PasswordAsync(fieldModel.Question) :
                            yield ask_1.Ask.TextAsync(fieldModel.Question);
                }
            }
            return this.config;
        });
    }
}
exports.SnConfigReader = SnConfigReader;
//# sourceMappingURL=snconfigreader.js.map