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
const Gulp = require("gulp");
const Delete = require("del");
const Promisify = require("gulp-promisify");
const GulpRun = require("gulp-run");
const Path = require("path");
const TEMP_FOLDER_NAME = 'tmp';
class Stage {
    constructor(paths) {
        this.paths = paths;
        Promisify(Gulp);
    }
    get TempFolderPath() {
        return `${this.paths.SnClientPath}${Path.sep}${TEMP_FOLDER_NAME}`;
    }
    PrepareAsync() {
        return __awaiter(this, void 0, void 0, function* () {
            this.Cleanup();
            return yield Gulp.src([
                `./src/**/*.ts`,
                `./src_commands/**/*.ts`,
                `./test/**/*.ts`,
                `!./src/SN.d.ts`,
                `./tsconfig.json`
            ], {
                base: this.paths.SnClientPath,
                cwd: this.paths.SnClientPath,
            })
                .pipe(Gulp.dest(this.TempFolderPath))
                .resume();
        });
    }
    UpdateModuleAsync() {
        return __awaiter(this, void 0, void 0, function* () {
            yield Gulp.src([
                `./tmp/src/**/*.ts`,
                `./tmp/dist/**/*.ts`,
                `!./src/SN.d.ts`
            ], {
                base: this.paths.SnClientPath,
                cwd: this.paths.SnClientPath,
            })
                .pipe(Gulp.dest(this.paths.SnClientPath))
                .resume();
            this.Cleanup();
        });
    }
    CompileAsync() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let buildResult = yield this.CallGulpRunAsync('tsc', this.TempFolderPath);
                let testResult = yield this.CallGulpRunAsync('nyc mocha -p tsconfig.json dist/test/index.js', this.TempFolderPath);
                let updateModuleResult = yield this.UpdateModuleAsync();
            }
            catch (error) {
                console.log('Failed to build types');
                this.Cleanup();
            }
        });
    }
    CallGulpRunAsync(command, workingDir) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                GulpRun(command, {
                    cwd: workingDir,
                    verbosity: 3
                }).exec((err) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve();
                    }
                });
            });
        });
    }
    Cleanup() {
        Delete.sync(this.TempFolderPath, { force: true });
    }
}
exports.Stage = Stage;
//# sourceMappingURL=stage.js.map