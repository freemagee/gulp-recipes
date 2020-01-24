# Gulp 4 and ES6 modules

This is a scaffold of the Gulp task I use on current projects (as of 2019). This particular example is setup to run on SCSS stylesheets and process the output with some PostCSS.

## TODO

I would probably restructure the task folder to be like this as it makes the tasks more self contained.

```
gulpfile.babel.js
GulpTasks
|   config.js
|   postcss.js
|   reportError.js
|   serve.js
└───core
|   |   index.js
|   |   task.js // This would be the current 'core.js' in GulpTasks
|   |   styles.js
|   |   watch.js
```