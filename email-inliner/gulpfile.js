var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uncss = require('gulp-uncss'),
    processhtml = require('gulp-processhtml'),
    rename = require('gulp-rename'),
    premailer = require('gulp-premailer'),
    clean = require('gulp-clean'),
    imagemin = require('gulp-imagemin'),
    zip = require('gulp-zip'),
    // Imagemin options - could be refactored to be a general options object
    options = {
        progressive: true
    },
    // This is an object which defines paths.
    paths = {
        src: './src/',
        dest: './output/',
        html: {
            tmp: './output/tmp/'
        },
        styles: {
            src: './src/*.css'
        },
        imgs: {
            src: './src/img/*',
            dest: './output/img'
        }
    }

gulp.task('cleaninit', function () {
    return gulp.src(paths.dest + '*', {read: false})
    .pipe(clean());
});

gulp.task('uncss', ['cleaninit'], function() {
    return gulp.src(paths.src + '*.css')
    .pipe(concat('tidy.css'))
    .pipe(uncss({
        html: [paths.src + '*.html']
    }))
    .pipe(gulp.dest(paths.dest + 'tmp/css/'));
});

gulp.task('processhtml', ['uncss'], function () {
    return gulp.src(paths.src + '*.html')
    .pipe(processhtml())
    .pipe(rename(function (path) {
        path.basename += "-inline";
        path.extname = ".html"
    }))
    .pipe(gulp.dest(paths.html.tmp));
});

gulp.task('premailer', ['processhtml'], function () {
    return gulp.src(paths.html.tmp + '*.html')
    .pipe(premailer())
    .pipe(gulp.dest(paths.dest));
});

gulp.task('optimg', ['premailer'], function () {
    return gulp.src(paths.imgs.src)
    .pipe(imagemin(options))
    .pipe(gulp.dest(paths.imgs.dest));
});

gulp.task('zipimg', ['optimg'], function () {
    return gulp.src(paths.imgs.dest + '/*')
    .pipe(zip('img.zip'))
    .pipe(gulp.dest(paths.dest))
});

gulp.task('cleanpost', ['zipimg'], function () {
    return gulp.src([paths.html.tmp, paths.src + '*', paths.imgs.dest], {read: false})
    .pipe(clean());
});

gulp.task('default', ['cleanpost']);