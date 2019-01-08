/*
 * Copyright (c) 2016-2018 Håkan Edling
 *
 * This software may be modified and distributed under the terms
 * of the MIT license.  See the LICENSE file for details.
 *
 * https://github.com/piranhacms/piranha.core
 *
 */

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    concat = require("gulp-concat"),
    cssmin = require("gulp-cssmin"),
    rename = require("gulp-rename"),
    uglify = require("gulp-uglify");

var input = {
    js: [
        //"Assets/js/polyfill.js",
        "node_modules/jquery/dist/jquery.js",
        "node_modules/popper.js/dist/umd/popper.js",
        "node_modules/bootstrap/dist/js/bootstrap.js",
        //"Assets/lib/jasny-bootstrap/dist/js/jasny-bootstrap.js",
        "Assets/lib/moment/min/moment.min.js",
        //"Assets/lib/bootstrap-datetimepicker-3/build/js/bootstrap-datetimepicker.min.js",
        "Assets/lib/jquery-nestable/jquery.nestable.js",
        "Assets/lib/jquery.ns-autogrow/dist/jquery.ns-autogrow.js",
        "Assets/lib/select2/dist/js/select2.js",
        "Assets/lib/dropzone/dist/dropzone.js",
        "Assets/lib/simplemde/dist/simplemde.min.js",
        //"Assets/lib/object.assign-polyfill/object.assign.js",
        "Assets/js/html5sortable.js",
        "Assets/js/piranha.notifications.js",
        "Assets/js/piranha.media.js",
        "Assets/js/piranha.page.js",
        "Assets/js/piranha.post.js",
        "Assets/js/ui.js"
    ],
    signaljs: [
        "node_modules/@aspnet/signalr/dist/browser/signalr.min.js"
    ],
};
var output = {
    js: "Assets/output/js/script.js",
    signaljs: "Assets/output/js/script.signalr.js"
};

gulp.task('min:css', function () {
    return gulp.src('Assets/scss/style.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(cssmin())
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(gulp.dest('Assets/output/css'));
    });

gulp.task('min:editor', function () {
    return gulp.src('Assets/scss/editor.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(cssmin())
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(gulp.dest('Assets/output/css'));
    });

gulp.task("min:js", function () {
    return gulp.src(input.js, { base: "." })
        .pipe(concat(output.js))
        .pipe(gulp.dest("."))
        .pipe(uglify())
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(gulp.dest("."));
});

gulp.task("min:signalr", function () {
    return gulp.src(input.signaljs, { base: "." })
        .pipe(concat(output.signaljs))
        .pipe(gulp.dest("."))
        .pipe(uglify())
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(gulp.dest("."));
});

//
// Default tasks
//
gulp.task("serve", ["min:css", "min:editor", "min:js", "min:signalr"]);
gulp.task("default", ["serve"]);
