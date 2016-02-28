"use strict"


// https://github.com/remojansen/ts-vscode-boilerplate/blob/master/gulpfile.js

// ===========================================================================================
// DEPENDENCIES ------------------------------------------------------------------------------

var gulp        = require("gulp");
var browserify  = require("browserify");
var source      = require("vinyl-source-stream");
var buffer      = require("vinyl-buffer");
var tslint      = require("gulp-tslint");
var tsc         = require("gulp-typescript");
var sourcemaps  = require("gulp-sourcemaps");
var uglify      = require("gulp-uglify");
var runSequence = require("run-sequence");
var mocha       = require("gulp-mocha");
var istanbul    = require("gulp-istanbul");
var browserSync = require('browser-sync').create();


// ===========================================================================================
// CONFIGURATION DATA ------------------------------------------------------------------------

var tsProject = tsc.createProject("tsconfig.json");
var tsTestProject = tsc.createProject("tsconfig.json");

var CFG = {
	"name": "fnk",
	"srcPath": "src/",
	"buildPath": "build/",
	"buildFile": "index.js",
	"releasePath": "release/",
	"releaseFile": "fnk.min.js",
	"testPath": "tests/"
};


// ===========================================================================================
// LINTING -----------------------------------------------------------------------------------

gulp.task("lint", function() {
    return gulp.src([
        CFG.srcPath + "**/**.ts",
        CFG.testPath + "**/**.test.ts"
    ])
    .pipe(tslint({ }))
    .pipe(tslint.report("verbose"));
});


// ===========================================================================================
// BUILDING ----------------------------------------------------------------------------------

gulp.task("build-app", function() {
    return gulp.src([
		CFG.srcPath + "**/**.ts",
		"typings/main.d.ts/",
		CFG.srcPath + "interfaces/interfaces.d.ts"
	])
	.pipe(tsc(tsProject))
	.js.pipe(gulp.dest(CFG.buildPath));
});

// Compile unit tests
gulp.task("build-test", function() {
    return gulp.src([
		CFG.testPath + "**/*.ts",
		"typings/main.d.ts/",
		CFG.srcPath + "interfaces/interfaces.d.ts"
	])
	.pipe(tsc(tsTestProject))
	.js.pipe(gulp.dest(CFG.buildPath));
});

gulp.task("build", function(cb) {
    runSequence(["build-app", "build-test"], cb);
});


// ===========================================================================================
// TESTING -----------------------------------------------------------------------------------

// Generate test coverage reports

gulp.task("istanbul:hook", function() {
    return gulp.src([CFG.buildPath + "**/*.js"])
	// Covering files
	.pipe(istanbul())
	// Force `require` to return covered files
	.pipe(istanbul.hookRequire());
});

// Run unit tests

gulp.task("test", ["istanbul:hook"], function() {
    return gulp.src(CFG.buildPath + "**/*.test.js")
        .pipe(mocha({ui: 'bdd'}))
        .pipe(istanbul.writeReports());
});


// ===========================================================================================
// BUNDLE ------------------------------------------------------------------------------------

gulp.task("bundle", function() {
    var bundler = browserify({
        debug: true,
        standalone : CFG.name
    });

    return bundler.add(CFG.buildPath + CFG.buildFile)
        .bundle()
        .pipe(source(CFG.releaseFile))
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(CFG.releasePath));
});


// ===========================================================================================
// WATCH AND SERVER --------------------------------------------------------------------------

gulp.task("watch", ["default"], function () {
    browserSync.init({
        server: "./release"
    });

    gulp.watch([CFG.srcPath + "**/**.ts", CFG.testPath + "**/*.ts"], ["default"]);
    gulp.watch(CFG.buildPath + "*.js").on('change', browserSync.reload);
});


// ===========================================================================================
// DEFAULT -----------------------------------------------------------------------------------

gulp.task("default", function (cb) {
    runSequence("lint", "build", "test", "bundle", cb);
});