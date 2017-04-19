
// build chain dependencies
const gulp = require('gulp');
const typedoc = require("gulp-typedoc");
const del = require('del');
var run = require('gulp-run');
var rename = require("gulp-rename");

const __coverageThreshold = 60;

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
        './tmp',
        './dist',
        './coverage',
        './coverage-report'
    ]);
});

gulp.task('build', ['build:clean'], function () {
    return run('tsc').exec();
});

gulp.task("typedoc", function () {
    return gulp
        .src([
            "./src/**/*.ts",
            "!./src/**/index.ts",
            "!./src/SN.ts",
            "!./src/SN.d.ts"
        ])
        .pipe(typedoc({
                module: "commonjs",
                target: "es2015",
                includeDeclarations: false,
                out: "./documentation/html",
                name: "sn-client-js",
                theme: "default",
                ignoreCompilerErrors: true,
                version: true,
                mode: "modules",
                readme: "sn-client-js/README.md",
                excludeExternals: true,
                excludePrivate: true,
                includes: "docs"
            }));
});


gulp.task("typedoc:md:generate", function () {
    return gulp
        .src([
            "./src/**/*.ts",
            "!./src/**/index.ts",
            "!./src/SN.ts",
            "!./src/SN.d.ts"
        ])
        .pipe(typedoc({
                module: "commonjs",
                target: "es2015",
                includeDeclarations: false,
                out: "./documentation/markdown",
                name: "sn-client-js",
                theme: "node_modules/typedoc-md-theme/bin",
                ignoreCompilerErrors: true,
                version: true,
                mode: "modules",
                readme: "sn-client-js/README.md",
                excludeExternals: true,
                excludePrivate: true,
                includes: "docs"
            }));
});

gulp.task('typedoc:md', ['typedoc:md:generate'], ()=>{
    gulp.src('./documentation/markdown/**/*.*')
    .pipe(rename((path)=>{
        path.extname= path.extname == '.html' ? '.md' : path.extname
    }))
    .pipe(gulp.dest('documentation/markdown_renamed'))
});

gulp.task('test', () => {
    return run('npm test')
        .exec();
});
gulp.task('default', ['build:lint', 'build', 'test']);