/**
 * Created by Alexandre on 11/2/2015.
 */

var browserify = require('browserify'),
    gulp = require('gulp'),
    util = require('gulp-util'),
    sourcemaps = require("gulp-sourcemaps"),
    concat = require("gulp-concat"),
    watch = require('gulp-watch'),
    rename = require('gulp-rename'),
    browserSync = require('browser-sync').create(),
    compass = require('gulp-compass');

var dirname = "./www";

gulp.task('default', ['compass', 'browser-sync']);

gulp.task('compass', function() {
    gulp.src(dirname + '/scss/**/*.scss')
        .pipe(compass({
            config_file: './config.rb',
            css: 'www/css',
            sass: 'www/scss'
        }))
        /*.pipe(gulp.dest(dirname + '/css/temp'))*/;
});

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: dirname
        }
    });

    gulp.watch(dirname + "/scss/**/*.scss", ['compass']);
    gulp.watch(dirname + "/css/*.css").on('change', browserSync.reload);
    gulp.watch(dirname + "/**/*.html").on('change', browserSync.reload);
    gulp.watch(dirname + "/**/*.js").on('change', browserSync.reload);
});