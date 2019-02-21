import browserSync from "browser-sync";
import gulp from "gulp";
import sass from "gulp-sass";
import sourcemaps from "gulp-sourcemaps";
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
      .pipe(sourcemaps.init())
      // Sass
      .pipe(sass({ outputStyle: "expanded" }))
      // Process with PostCSS
      .pipe(postcss(processors.dev))
      // Hashing for cache busting, hash before generating source map
      .pipe(hash())
      // Write out the source map to the same dir
      .pipe(sourcemaps.write("."))
      // Finally output a css file
      .pipe(gulp.dest(paths.styles.dest))
      // Create a hash map
      .pipe(hash.manifest("hash.json"))
      // Put the map in the data directory
      .pipe(gulp.dest(paths.styles.data))
      // Inject into browser
      .pipe(
        browserSync.stream({
          match: "**/*.css"
        })
      )
  );
}

export default styles;
