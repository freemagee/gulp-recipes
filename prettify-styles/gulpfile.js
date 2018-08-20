var gulp = require('gulp');
var clean = require('gulp-clean');
var prettify = require('gulp-jsbeautifier');

gulp.task('cleaninit', function () {
    return gulp.src('./dist/*', {read: false})
    .pipe(clean());
});

gulp.task('prettify', ['cleaninit'], function() {
  gulp.src(['./src/css/**/*.css', './src/scss/**/*.scss'])
    .pipe(prettify({
      config: './jsbeautify.json'
    }))
    .pipe(gulp.dest('./dist'));
});

gulp.task('default', ['prettify']);
