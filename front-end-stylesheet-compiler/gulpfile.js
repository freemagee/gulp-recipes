// Inspired by https://www.mikestreety.co.uk/blog/advanced-gulp-file
// Define gulp before we start
var gulp = require('gulp');
// Define Sass, Autoprefixer & Sourcemaps
var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
// Define other utilities
var notify = require('gulp-notify');
var plumber = require('gulp-plumber');
var changed = require('gulp-changed');
var browserSync = require('browser-sync').create();
// This is an object which defines paths for the styles.
// Can add paths for javascript or images for example
var basePaths = {
    src: './app/',
    dest: './app/'
};
var paths = {
    styles: {
        src: basePaths.src + 'stylesheets/scss',
        files: basePaths.src + 'stylesheets/scss/**/*.scss',
        dest: basePaths.src + 'stylesheets/css'
    }
};
// A display error function, to format and make custom errors more uniform
// Could be combined with gulp-util or npm colors for nicer output
var displayError = function(error) {
    // Initial building up of the error
    var errorString = '[' + error.plugin + ']';
    errorString += ' ' + error.message.replace("\n",' '); // Removes new line at the end
    // If the error contains the filename or line number add it to the string
    if(error.fileName) {
        errorString += ' in ' + error.fileName;
    }
    if(error.lineNumber) {
        errorString += ' on line ' + error.lineNumber;
    }
    // This will output an error like the following:
    // [gulp-sass] error message in file_name on line 1
    notify(errorString).write('');
};
// A change event function, displays which file changed
var changeEvent = function(evt) {
    var filename = evt.path.split("\\").pop();
    notify('[watcher] File ' + filename + ' was ' + evt.type + ', compiling...').write('');
};
// Setting up the sass task
gulp.task('compile-sass', function (){
    // Taking the path from the paths object
    return gulp.src(paths.styles.files)
        .pipe(plumber(function (error) {
                // If there is an error use the custom displayError function
                displayError(error);
                this.emit('end');
        }))
        .pipe(changed(paths.styles.dest))
        .pipe(sourcemaps.init())
        // Sass options - make the output compressed and add the source map
        // Also pull the include path from the paths object
        .pipe(sass({
            outputStyle: 'compressed',
            includePaths : [paths.styles.src]
        }))
        // Pass the compiled sass through the prefixer with defined
        .pipe(prefix({
            browsers: ['last 2 Chrome versions'],
            cascade: false
        }))
        .pipe(sourcemaps.write('./', {includeContent: true, sourceRoot: '../scss'}))
        // Finally put the compiled sass into a css file
        .pipe(gulp.dest(paths.styles.dest))
        // Inject into browser
        .pipe(browserSync.stream({match: '**/*.css'}));
});
// This is the default task - which is run when `gulp` is run
// The tasks passed in as an array are run before the tasks within the function
gulp.task('watch-sass', ['compile-sass'], function() {
    // Watch the files in the paths object, and when there is a change, fun the functions in the array
    gulp.watch(paths.styles.files, ['compile-sass'])
    // Also when there is a change, display what file was changed, only showing the path after the 'sass folder'
    .on('change', function(evt) {
        changeEvent(evt);
    });
});
// Serve site and enable browsersync
gulp.task('serve', ['watch-sass'], function () {
    // Initiate BrowserSync
    // Docs: https://www.browsersync.io/docs/gulp
    browserSync.init({
        //proxy: "http://localhost:####/"
        server: {
            baseDir: "./app/"
        }
    });
});