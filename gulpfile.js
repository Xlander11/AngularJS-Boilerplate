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
    compass = require("gulp-compass");

var dirname = "./www";

gulp.task("default", ["compass", "scripts", "browser-sync"]);

gulp.task("compass", function() {
    gulp.src(dirname + "/scss/**/*.scss")
        .pipe(compass({
            config_file: "./config.rb",
            css: "www/css",
            sass: "www/scss"
        }))
        /*.pipe(gulp.dest(dirname + '/css/temp'))*/;
});

gulp.task("scripts", function () {
    return gulp.src([
        dirname + "/lib/jquery-1.11.3.min.js",
        dirname + "/lib/angular.min.js",
        dirname + "/lib/angular-ui-router.min.js",
        dirname + "/app.module.js",
        dirname + "/app.config.js",
        dirname + "/js/**/*.js"
    ])
        .pipe(sourcemaps.init())
        .pipe(concat("functions.js"))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(dirname + "/"));
});

gulp.task("browser-sync", function() {
    browserSync.init({
        server: {
            baseDir: dirname
        }
    });

    gulp.watch(dirname + "/scss/**/*.scss", ["compass"]);
    gulp.watch(dirname + "/js/**/*.js", ["scripts"]);
    gulp.watch([dirname + "/app.module.js", dirname + "/app.config.js"], ["scripts"]);
    gulp.watch(dirname + "/css/*.css").on("change", browserSync.reload);
    gulp.watch(dirname + "/views/*.html").on("change", browserSync.reload);
    gulp.watch(dirname + "/*.html").on("change", browserSync.reload);
    gulp.watch(dirname + "/js/**/*.html").on("change", browserSync.reload);
    gulp.watch(dirname + "/*.js").on("change", browserSync.reload);
});