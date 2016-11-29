
// build chain dependencies
const gulp = require('gulp');
const ts = require('gulp-typescript');
const mocha = require('gulp-mocha');
const sourcemaps = require('gulp-sourcemaps');
const istanbul = require('gulp-istanbul');
const remapIstanbul = require('remap-istanbul/lib/gulpRemapIstanbul');
const typedoc = require("gulp-typedoc");
const del = require('del');

const __coverageThreshold = 60;
const tsProject = ts.createProject('./tsconfig.json');

const tslint = require("gulp-tslint");

gulp.task("build:lint", function () {
    return gulp.src(["./**/*.ts", "!./node_modules/**/*", "!./test/**/*"])
        .pipe(tslint({
            configuration: {
                rules: {
                    "variable-name": false,
                    "quotemark": [true, "single", "avoid-escape"],
                    "max-file-line-count": false
                }
            }
        }))
        .pipe(tslint.report())
});

gulp.task('build:clean', function () {
    return del([
        './dist',
        './coverage',
        './coverage-report'
    ]);
});

gulp.task('build', ['build:clean'], function () {
    return gulp.src([
        './src/**/*.ts',
        './test/**/*.ts'
    ], { base: '.' })
        .pipe(sourcemaps.init())
        .pipe(tsProject())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./dist'));
})

gulp.task('test:instrument', ['build'], function () {
    return gulp.src('./dist/src/**/*.js')
        .pipe(istanbul())
        .pipe(istanbul.hookRequire()); //this forces any call to 'require' to return our instrumented files
});

gulp.task('test:cover', ['test:instrument'], function () {
    return gulp.src('./dist/**/*Tests.js')
        .pipe(mocha({ ui: 'bdd' })) //runs tests
        .pipe(istanbul.writeReports({
            reporters: ['json', 'html'] //this yields a basic non-sourcemapped coverage.json file
        })).on('end', remapCoverageFiles); //remap
});

//using remap-istanbul we can point our coverage data back to the original ts files
function remapCoverageFiles() {
    return gulp.src('./coverage/coverage-final.json')
        .pipe(remapIstanbul({
            basePath: '.',
            reports: {
                'html': './coverage',
                'text-summary': null,
                'lcovonly': './coverage/lcov.info'
            }
        }));
}

gulp.task("typedoc", function () {
    return gulp
        .src(["src/*.ts", "!src/SN.ts"])
        .pipe(typedoc({
            module: "commonjs",
            target: "es2015",
            includeDeclarations: false,
            out: "./documentation",
            name: "sn-client-js",
            theme: "default",
            ignoreCompilerErrors: true,
            version: true,
            readme: "sn-client-js/README.md",
            excludeExternals: true,
            excludePrivate: true,
            includes: "docs"
        }));
});

gulp.task('test', ['test:cover']);
gulp.task('default', ['build:lint', 'build', 'test']);