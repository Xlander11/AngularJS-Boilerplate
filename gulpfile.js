/**
 * Created by Alexandre on 11/2/2015.
 */

var browserify = require("browserify"),
    gulp = require("gulp"),
    util = require("gulp-util"),
    sourcemaps = require("gulp-sourcemaps"),
    concat = require("gulp-concat"),
    watch = require("gulp-watch"),
    rename = require("gulp-rename"),
    browserSync = require("browser-sync").create(),
    compass = require("gulp-compass"),
    includeSources = require("gulp-include-source"),
    minifyCss = require("gulp-minify-css"),
    minifyJs = require("gulp-minify"),
    clean = require("gulp-clean"),
    runSequence = require('run-sequence');

var dirname = "./www";
var build = dirname + "/build";

gulp.task("default", function () {
    runSequence("compass", "html", "browser-sync");
});

gulp.task("html", function () {
    return gulp.src(dirname + "/index.tpl.html" )
        .pipe( includeSources() )
        .pipe(rename(dirname + "/index.html"))
        .pipe( gulp.dest("./"));
});

gulp.task("compass", function() {
    gulp.src(dirname + "/scss/**/*.scss")
        .pipe(compass({
            config_file: "./config.rb",
            css: "www/css",
            sass: "www/scss",
            comments: true
        }));
});

gulp.task("scripts", function () {
    return gulp.src([
        dirname + "/lib/jquery-1.11.3.min.js",
        dirname + "/lib/angular.min.js",
        dirname + "/lib/angular-ui-router.min.js",
        dirname + "/app.module.js",
        dirname + "/app.config.js",
        dirname + "/components/**/*.js"
    ])
        .pipe(sourcemaps.init())
        .pipe(concat("functions.js"))
        .pipe(sourcemaps.write())
        .pipe(minifyJs())
        .pipe(gulp.dest(dirname + "/js/"));
});

gulp.task("minifyCss", function () {
    return gulp.src(dirname + "/css/*.css")
        .pipe(sourcemaps.init())
        .pipe(minifyCss({compatibility: 'ie8'}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(build + "/css/"));
});

gulp.task('clean', function () {
    return gulp.src(build, {read: false})
        .pipe(clean());
});

gulp.task('buildHtml', function () {
    return gulp.src(dirname + "/index.build.tpl.html" )
        .pipe( includeSources() )
        .pipe(rename(build + "/index.html"))
        .pipe( gulp.dest("./"));
});

gulp.task('buildScript', function () {
    return gulp.src(dirname + "/js/*-min.js" )
        .pipe( gulp.dest(build + "/js/"));
});

gulp.task("build", function () {
    runSequence("clean", "minifyCss", "scripts", "buildScript", "buildHtml");
});

gulp.task("browser-sync", function() {
    browserSync.init({
        server: {
            baseDir: dirname
        }
    });

    gulp.watch(dirname + "/scss/**/*.scss", ["compass"]);
    gulp.watch(dirname + "/css/*.css").on("change", browserSync.reload);
    gulp.watch(dirname + "/components/**/*.js").on("change", browserSync.reload);
    gulp.watch(dirname + "/*.js").on("change", browserSync.reload);
    gulp.watch(dirname + "/views/*.html").on("change", browserSync.reload);
    gulp.watch(dirname + "/*.html").on("change", browserSync.reload);
    gulp.watch(dirname + "/components/**/*.html").on("change", browserSync.reload);
});