var gulp = require("gulp");
var markdown = require("gulp-markdown");
var wrap = require("gulp-wrap");
var rename = require("gulp-rename");

gulp.task("default", function() {
  return gulp
    .src("./src/*.md")
    .pipe(markdown())
    .pipe(wrap({ src: "./template.html" }))
    .pipe(rename({
      extname: ".html"
    }))
    .pipe(gulp.dest("./output"));
});
