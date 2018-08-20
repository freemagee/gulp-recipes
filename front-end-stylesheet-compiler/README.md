## Front-end stylesheet compiler

This task is meant to compile and serve scss based assets with browser reload showing new changes

### Requirements

Put your source files in `/App`. The gulp task is expecting scss files to exist in `/App/stylesheets/scss`. See **config** for how to amend this.

### Installation and usage

```
npm install
gulp compile-sass
gulp watch
gulp serve
```

#### Output

Output css files should appear in `/App/stylesheets/css`

## Config

You can modify the settings in the `gulpfile.js` to change source paths. Look for:

```javascript
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
```