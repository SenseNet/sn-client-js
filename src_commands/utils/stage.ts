import { PathHelper } from './';
import * as Gulp from 'gulp';
import * as GulpTypescript from 'gulp-typescript';
import * as GulpMocha from 'gulp-mocha';
import * as GulpSourceMaps from 'gulp-sourcemaps';
import * as Delete from 'del';
import * as Promisify from 'gulp-promisify';
import * as Path from 'path';

const STAGE_TASKS_PREFIX = 'SN_COMMANDS_STAGE_';
const STAGE_TASK_CLEANUP = `${STAGE_TASKS_PREFIX}CLEANUP`;
const STAGE_TASK_PREPARE = `${STAGE_TASKS_PREFIX}PREPARE`;
const STAGE_TASK_BUILD = `${STAGE_TASKS_PREFIX}BUILD`;
const STAGE_TASK_FINIALIZE = `${STAGE_TASKS_PREFIX}FINIALIZE`;

const TEMP_FOLDER_NAME = 'tmp';

const currentDir = __dirname;

export class Stage {

    constructor(private paths: PathHelper) {
        Promisify(Gulp);
    }
    public get TempFolderName(): string {
        return TEMP_FOLDER_NAME;
    }

    public get TempFolderPath(): string {
        return `${this.paths.SnClientPath}${Path.sep}${TEMP_FOLDER_NAME}`;
    }

    public async PrepareAsync() {
        this.Cleanup();
        await Gulp.src([
            `./src/**/*.ts`,
            `./test/**/*.ts`,
            `!./src/SN.d.ts`
        ], {
                base: this.paths.SnClientPath,
                cwd: this.paths.SnClientPath,
            })
            .pipe(Gulp.dest(this.TempFolderPath))
            .resume();
    }

    public Compile() {
        try {
            return Gulp.start(STAGE_TASK_BUILD);
        } catch (error) {
            console.log('Failed to build types');
            return Gulp.start(STAGE_TASK_CLEANUP);
        }
    }

    public Cleanup() {
        Delete.sync(this.TempFolderPath, {force: true});
    }
}