const gulp = require("gulp");
const clean = require("gulp-clean");
const imagemin = require("gulp-imagemin");
const options = {
  progressive: true
};

function cleanInit() {
  return gulp.src("./output/*", { read: false }).pipe(clean());
}

function processImages() {
  return gulp
    .src("./src/*")
    .pipe(imagemin(options))
    .pipe(gulp.dest("./output"));
}

const defaultTask = gulp.series(cleanInit, processImages);

exports.default = defaultTask;
