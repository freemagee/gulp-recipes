import browserSync from "browser-sync";
import gulp from "gulp";
import sass from "gulp-sass";
import sourcemaps from "gulp-sourcemaps";
import plumber from "gulp-plumber";
import postcss from "gulp-postcss";
import { paths } from "../config";
import reportError from "../reportError";
import processors from "../postcss";

function styles() {
  const toProcess = [paths.core.files];

  return (
    gulp
      .src(toProcess)
      // Deal with errors, but prevent Gulp from stopping
      .pipe(
        plumber({
          errorHandler: reportError
        })
      )
      .pipe(sourcemaps.init())
      .pipe(sass())
      .pipe(postcss(processors.core))
      .pipe(sourcemaps.write("."))
      .pipe(gulp.dest(paths.core.dest))
      .pipe(
        browserSync.stream({
          match: "**/*.css"
        })
      )
  );
}

export default styles;
