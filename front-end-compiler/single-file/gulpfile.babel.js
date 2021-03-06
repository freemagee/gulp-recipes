/* eslint no-console: 0 */
import gulp from "gulp";
// Define Sass, Autoprefixer & Sourcemaps
import sass from "gulp-sass";
import sourcemaps from "gulp-sourcemaps";
// POST CSS
import postcss from "gulp-postcss";
import fontMagician from "postcss-font-magician";
import postcssPresetEnv from "postcss-preset-env";
import cssnano from "cssnano";
// Define other utilities
import notify from "gulp-notify";
import plumber from "gulp-plumber";
import colors from "ansi-colors";
import beeper from "beeper";
import browserSync from "browser-sync";
import del from "del";
import rev from "gulp-rev";
import revReplace from "gulp-rev-replace";
import handler from "serve-handler";
import http from "http";

// Browsersync init
browserSync.create();

// Common paths
const assetPaths = {
  src: "./src",
  temp: "./temp",
  dest: "./build",
  dev: "./dev"
};
const templatePaths = {
  src: "./public",
  dest: "./build"
};
const paths = {
  styles: {
    src: `${assetPaths.src}/scss`,
    files: `${assetPaths.src}/scss/**/*.scss`,
    temp: `${assetPaths.temp}/static/css`,
    dev: `${assetPaths.dev}/static/css`
  },
  manifest: `${assetPaths.dest}/asset-manifest.json`
};
const fontMagicianConfig = {
  variants: {
    Montserrat: {
      "400": ["woff", "woff2"],
      "400 italic": ["woff", "woff2"],
      "700": ["woff", "woff2"]
    }
  },
  foundries: "google",
  protocol: "https:"
};
// Error handler
// Heavily inspired by: https://github.com/mikaelbr/gulp-notify/issues/81#issuecomment-100422179
const reportError = function reportErrorFn(error) {
  const messageOriginal = error.messageOriginal ? error.messageOriginal : "";

  notify({
    title: `Task Failed [${error.plugin}]`,
    message: messageOriginal,
    sound: "Sosumi" // See: https://github.com/mikaelbr/node-notifier#all-notification-options-with-their-defaults
  }).write(error);

  beeper(); // Beep 'sosumi' again

  // Inspect the error object
  // console.log(error);

  // Easy error reporting
  // console.log(error.toString());

  // Pretty error reporting
  let report = "";
  const chalk = colors.white.bgRed;

  report += `${chalk("TASK:")} [${error.plugin}]\n`;

  if (error.file) {
    report += `${chalk("FILE:")} ${error.file}\n`;
  }

  if (error.line) {
    report += `${chalk("LINE:")} ${error.line}\n`;
  }

  report += `${chalk("PROB:")} ${error.message}\n`;

  console.error(report);

  // Prevent the 'watch' task from stopping
  this.emit("end");
};
// A change event function, displays which file changed
const changeEvent = (path, type) => {
  const filename = path.split("\\").pop();
  notify(`[watcher] File ${filename} was ${type}, compiling...`).write("");
};

// REVISIONS
// ============================================================================

function generateManifest() {
  return gulp
    .src([`${paths.styles.temp}/*.css`], { base: "temp" })
    .pipe(rev())
    .pipe(gulp.dest(`${assetPaths.dest}`))
    .pipe(rev.manifest("asset-manifest.json"))
    .pipe(gulp.dest(`${assetPaths.dest}`));
}

function updateFromManifest() {
  const manifest = gulp.src(paths.manifest);

  return gulp
    .src(`${assetPaths.dest}/index.html`)
    .pipe(revReplace({ manifest }))
    .pipe(gulp.dest(assetPaths.dest));
}

const revise = gulp.series(generateManifest, updateFromManifest);

revise.description =
  "Generate manifest json and update static assets with revision hash";
gulp.task("revise", revise);

// PROCESS STYLES FOR BUILD
// ============================================================================

function buildStyles() {
  const processors = [
    fontMagician(fontMagicianConfig),
    postcssPresetEnv(),
    cssnano()
  ];

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
      .pipe(postcss(processors))
      // Finally output a css file
      .pipe(gulp.dest(paths.styles.temp))
  );
}

const processBuildStyles = gulp.series(buildStyles);

processBuildStyles.description = "Convert SCSS to CSS, minify, no-sourcemap";
gulp.task("processBuildStyles", processBuildStyles);

// PROCESS STYLES FOR DEVELOPMENT
// ============================================================================

function devStyles() {
  const processors = [fontMagician(fontMagicianConfig), postcssPresetEnv()];

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
      .pipe(sass())
      // Process with PostCSS - autoprefix & minify
      .pipe(postcss(processors))
      // Add the source map inline
      .pipe(sourcemaps.write())
      // Finally output a css file
      .pipe(gulp.dest(paths.styles.dev))
      // Inject into browser
      .pipe(
        browserSync.stream({
          match: "**/*.css"
        })
      )
  );
}

// WATCH
// ============================================================================

function watchFiles() {
  gulp
    .watch(
      paths.styles.files,
      {
        delay: 300
      },
      gulp.series(devStyles)
    )
    .on("change", evt => {
      changeEvent(evt, "changed");
    });
}

const watch = gulp.series(watchFiles);

watch.description = "Watch file changes in /src";
gulp.task("watch", watch);

// BROWSER SYNC
// ============================================================================

function startSync() {
  browserSync.init({
    // baseDir: "./dev/"
    proxy: "http://localhost:5001/"
  });
}

// BUILD SERVER
// ============================================================================

function serveBuild() {
  return new Promise(resolve => {
    const server = http.createServer((request, response) =>
      handler(request, response, {
        public: "build"
      })
    );

    server.listen(5000, () => {
      console.log("Running at http://localhost:5000");
    });

    resolve();
  });
}

const serve = gulp.series(serveBuild);

serve.description = "Serve /build";
gulp.task("serve", serve);

// DEV SERVER
// ============================================================================

function devServer() {
  return new Promise(resolve => {
    const server = http.createServer((request, response) =>
      handler(request, response, {
        public: "dev"
      })
    );

    server.listen(5001, () => {
      console.log("Running at http://localhost:5001");
    });

    resolve();
  });
}

// POST BUILD
// ============================================================================

function postBuild() {
  return new Promise(resolve => {
    // Delete /temp & /dev
    del([assetPaths.temp, assetPaths.dev]).then(() => {
      // Resolve promise
      resolve();
    });
  });
}

// PREPARE BUILD
// ============================================================================

function preBuild() {
  return new Promise(resolve => {
    // Delete /build
    del([assetPaths.dest, assetPaths.temp]).then(() => {
      // Copy template file to /build
      gulp
        .src(`${templatePaths.src}/index.html`)
        .pipe(gulp.dest(assetPaths.dest));
      // Resolve promise
      resolve();
    });
  });
}

// PREPARE DEV
// ============================================================================

function prepareDev() {
  return new Promise(resolve => {
    // Delete /dev
    del(assetPaths.dev).then(() => {
      // Copy template file to /dev
      gulp
        .src(`${templatePaths.src}/index.html`)
        .pipe(gulp.dest(assetPaths.dev));
      // Resolve promise
      resolve();
    });
  });
}

// DEVELOP
// ============================================================================

const develop = gulp.series(
  prepareDev,
  devStyles,
  devServer,
  gulp.parallel(watchFiles, startSync)
);

develop.description = "Serve /dev, process and watch assets";
gulp.task("develop", develop);

// BUILD
// ============================================================================

const build = gulp.series(preBuild, buildStyles, revise, postBuild);

build.description = "Create production ready build";
gulp.task("build", build);
