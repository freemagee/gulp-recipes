import gulp from "gulp";
import sass from "gulp-sass";
import plumber from "gulp-plumber";
import postcss from "gulp-postcss";
import del from "del";
import hash from "gulp-hash";
import paths from "../paths";
import reportError from "../reportError";
import processors from "../postcss";

function styles() {
  // Delete our old css files
  del(paths.styles.del);

  // Taking the path from the paths object
  return (
    gulp
      .src(paths.styles.files)
      // Deal with errors, but prevent Gulp from stopping
      .pipe(
        plumber({
          errorHandler: reportError
        })
      )
      // Sass
      .pipe(sass())
      // Process with PostCSS - autoprefix & minify
      .pipe(postcss(processors.build))
      // Hashing for cache busting
      .pipe(hash())
      // Output a css file
      .pipe(gulp.dest(paths.styles.dest))
      // Create a hash map
      .pipe(hash.manifest("hash.json"))
      // Put the map in the data directory
      .pipe(gulp.dest(paths.styles.data))
  );
}

export default styles;
