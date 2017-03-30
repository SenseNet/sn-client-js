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
const Path = require("path");
const sourcemaps = require("gulp-sourcemaps");
const ts = require("gulp-typescript");
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
    CompileAsync() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let tsProject = ts.createProject(Path.join(this.paths.SnClientPath, 'tsconfig.json'));
                return yield Gulp.src([
                    './tmp/src/**/*.ts',
                    `./tmp/src_commands/**/*.ts`,
                    './tmp/test/**/*.ts'
                ], {
                    base: this.paths.SnClientPath,
                    cwd: this.paths.SnClientPath
                })
                    .pipe(sourcemaps.init())
                    .pipe(tsProject())
                    .pipe(sourcemaps.write('.'))
                    .pipe(Gulp.dest('./dist2'));
            }
            catch (error) {
                console.log('Failed to build types');
                this.Cleanup();
            }
        });
    }
    Cleanup() {
        Delete.sync(this.TempFolderPath, { force: true });
    }
}
exports.Stage = Stage;
//# sourceMappingURL=stage.js.map