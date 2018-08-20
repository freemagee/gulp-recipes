var gulp = require("gulp");
var clean = require("gulp-clean");
var imagemin = require("gulp-imagemin");
var options = {
  progressive: true
};

gulp.task("cleaninit", function() {
  return gulp.src("./dest", { read: false }).pipe(clean());
});

gulp.task("optim", ["cleaninit"], function() {
  return gulp
    .src("./src/*")
    .pipe(imagemin(options))
    .pipe(gulp.dest("./output"));
});

gulp.task("default", ["optim"]);
