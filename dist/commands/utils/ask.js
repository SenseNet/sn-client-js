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
const Prompt = require("prompt");
class Ask {
    static TextAsync(question) {
        return __awaiter(this, void 0, void 0, function* () {
            return Ask.Ask(question);
        });
    }
    static PasswordAsync(question) {
        return __awaiter(this, void 0, void 0, function* () {
            return Ask.Ask(question, true);
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
}
exports.Ask = Ask;
//# sourceMappingURL=ask.js.map