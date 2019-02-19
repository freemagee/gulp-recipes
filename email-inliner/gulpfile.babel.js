/* eslint no-console: 0 */
import gulp from "gulp";
import concat from "gulp-concat";
import uncss from "gulp-uncss";
import processhtml from "gulp-processhtml";
import rename from "gulp-rename";
import premailer from "gulp-premailer";
import imagemin from "gulp-imagemin";
import zip from "gulp-zip";
import del from "del";
// import colors from "ansi-colors";

// Common paths
const paths = {
  src: "./src/",
  dest: "./output/",
  html: {
    tmp: "./output/tmp/"
  },
  styles: {
    src: "./src/*.css"
  },
  imgs: {
    src: "./src/img/*",
    dest: "./output/img"
  }
};

// Config
const options = {
  progressive: true
};

// TASK FUNCTIONS
// ============================================================================

function cleanInit() {
  return del(`${paths.dest}*`);
}

function tidyCss() {
  return gulp
    .src(`${paths.src}*.css`)
    .pipe(concat("tidy.css"))
    .pipe(
      uncss({
        html: [`${paths.src}*.html`]
      })
    )
    .pipe(gulp.dest(`${paths.dest}tmp/css/`));
}

function processTemplate() {
  return gulp
    .src(`${paths.src}*.html`)
    .pipe(processhtml())
    .pipe(
      rename(path => {
        path.basename += "-inlined";
        path.extname = ".html";
      })
    )
    .pipe(gulp.dest(paths.html.tmp));
}

function premail() {
  return gulp
    .src(`${paths.html.tmp}*.html`)
    .pipe(premailer())
    .pipe(gulp.dest(paths.dest));
}

function optImg() {
  return gulp
    .src(paths.imgs.src)
    .pipe(imagemin(options))
    .pipe(gulp.dest(paths.imgs.dest));
}

function zipImg() {
  return gulp
    .src(`${paths.imgs.dest}/*`)
    .pipe(zip("img.zip"))
    .pipe(gulp.dest(paths.dest));
}

function cleanPost() {
  return del([paths.html.tmp, paths.imgs.dest]);
}

// DEFINE TASKS
// ============================================================================
const run = gulp.series(
  cleanInit,
  tidyCss,
  processTemplate,
  premail,
  optImg,
  zipImg,
  cleanPost
);

run.description = "Run the main task sequentially";
gulp.task("default", run);
