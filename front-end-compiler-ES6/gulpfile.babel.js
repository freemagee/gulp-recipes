/* eslint no-console: 0 */
import gulp from "gulp";
// Define Sass, Autoprefixer & Sourcemaps
import sass from "gulp-sass";
import sourcemaps from "gulp-sourcemaps";
// POST CSS
import postcss from "gulp-postcss";
import cssnext from "postcss-cssnext";
import cssnano from "cssnano";
// JS related
import concat from "gulp-concat";
import uglify from "gulp-uglify";
import ngAnnotate from "gulp-ng-annotate";
// Define other utilities
import notify from "gulp-notify";
import plumber from "gulp-plumber";
import colors from "ansi-colors";
import beeper from "beeper";
import del from "del";
import browserSync from "browser-sync";

// Browsersync init
browserSync.create();
// Common paths
const paths = {
    styles: {
        src: "./App/Stylesheets/scss",
        files: "./App/Stylesheets/scss/**/*.scss",
        dest: "./App/Stylesheets/css"
    },
    scripts: {
        src: "./App/JavaScript/",
        files: "./App/JavaScript/**/*.js",
        dest: "./App/JavaScript/"
    }
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

// SCRIPTS
// =============================================================================
function scripts() {
    return (
        gulp
            .src(paths.scripts.files)
            // Deal with errors, but prevent Gulp from stopping
            .pipe(
                plumber({
                    errorHandler: reportError
                })
            )
            .pipe(sourcemaps.init())
            .pipe(concat("app.min.js"))
            .pipe(ngAnnotate())
            .pipe(uglify())
            .pipe(sourcemaps.write())
            .pipe(gulp.dest(paths.scripts.dest))
    );
}

function cleanScripts() {
    return del([`${paths.scripts.dest}app.min.js`]);
}

const processScripts = gulp.series(cleanScripts, scripts);
processScripts.description = "Concat and minify JavaScript";
gulp.task("processScripts", processScripts);

// SASS
// =============================================================================
function styles() {
    const nanoOptions = {
        zindex: false
    };
    const processors = [cssnext(), cssnano(nanoOptions)];

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
            .pipe(sourcemaps.write("."))
            // Finally output a css file
            .pipe(gulp.dest(paths.styles.dest))
            // Inject into browser
            .pipe(
                browserSync.stream({
                    match: "**/*.css"
                })
            )
    );
}
const processStyles = gulp.series(styles);
processStyles.description = "Convert SCSS to CSS";
gulp.task("processStyles", processStyles);

// WATCH
// =============================================================================
function watchFiles() {
    gulp.watch(
        paths.styles.files,
        {
            delay: 300
        },
        gulp.series("processStyles")
    ).on(
        "change",
        evt => {
            changeEvent(evt, "changed");
        }
    );

    gulp.watch(
        paths.scripts.files,
        {
            delay: 300,
            ignored: /(\.min)\.(js)$/
        },
        gulp.series("processScripts")
    ).on("change", evt => {
        changeEvent(evt, "changed");
        browserSync.reload(`${paths.scripts.dest}app.min.js`);
    });
}
const watch = gulp.series(watchFiles);
watch.description = "Keep an eye on asset changes";
gulp.task("watch", watch);

// SERVE
// =============================================================================
const startServer = () => {
    browserSync.init({
        proxy: "http://localhost:3000/"
    });
};
const serve = gulp.series(startServer);
serve.description =
    "Start a browser sync session mapped to the localhost port";
gulp.task("serve", serve);

// DEVELOP
// =============================================================================
gulp.task("develop", gulp.parallel(serve, watch));

// DEFAULT - does nothing!
// =============================================================================
gulp.task(
    "default",
    () =>
        new Promise(resolve => {
            const chalk = colors.white.bgBlue;
            const message = `${chalk(
                "Action:"
            )} for task information type gulp -T`;

            console.log(message);
            resolve();
        })
);
