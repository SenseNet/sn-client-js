import { PathHelper } from './';
import * as Gulp from 'gulp';
import * as GulpTypescript from 'gulp-typescript';
import * as GulpMocha from 'gulp-mocha';
import * as GulpSourceMaps from 'gulp-sourcemaps';
import * as Delete from 'del';
import * as Promisify from 'gulp-promisify';
import * as Path from 'path';

import * as sourcemaps from 'gulp-sourcemaps';
import * as ts from 'gulp-typescript';

const TEMP_FOLDER_NAME = 'tmp';

/**
 * This class is used to handle the new incoming types from the repository in a transactional way.
 * Usage
 *  - make a clean environment (temp folder)
 *  - copy the existing client-related Typescript modules and test files (some of them will be overwritten the new ones from the repository)
 *  - build the module
 *  - run the unit tests
 *  - (if the build and the unit tests has been succeeded) copy the files back to the package root
 *  - clean up the temporary environment
 */
export class Stage {

    /**
     * @param paths {PathHelper} Contextual path options
     * @constructs Stage
     */
    constructor(private paths: PathHelper) {
        Promisify(Gulp);
    }

    /**
     * @returns The absolute path of the Temporary folder
     */
    public get TempFolderPath(): string {
        return `${this.paths.SnClientPath}${Path.sep}${TEMP_FOLDER_NAME}`;
    }

    /**
     * Prepare the specified temporary folder
     * - Cleans up if neccessary
     * - Copies the existing Typescript source files and testss
     */
    public async PrepareAsync() {
        this.Cleanup();
        return await Gulp.src([
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
    }

    /**
     * Compiles the artifacts in the specified temp folder and runs the unit tests
     * @throws {Error} if the build or the test has been failed
     */
    public async CompileAsync() {
        try {
            let tsProject = ts.createProject(Path.join(this.paths.SnClientPath, 'tsconfig.json'));
            // toDo - Refac to TSC
            return await Gulp.src([
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
        } catch (error) {
            console.log('Failed to build types');
            this.Cleanup();
        }
    }

    /**
     * Cleans up (deletes) the specified temporary folder
     */
    public Cleanup() {
        Delete.sync(this.TempFolderPath, { force: true });
    }
}