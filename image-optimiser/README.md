## Image optimiser

This task optimises images, but does not change their quality. It strips out metadata to make files smaller.

### Requirements

Put jpg, png, gif, svg files in `/src`

### Installation and usage

```
npm install
gulp
```

### Output

Output image files should appear in `/output`

#### Configuration

Currently this task has minimal configuration. See the gulpfile.js:

```javascript
var options = {
  progressive: true
};
```

For config options, see [gulp-imagemin](https://www.npmjs.com/package/gulp-imagemin)