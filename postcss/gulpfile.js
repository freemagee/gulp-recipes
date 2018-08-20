var gulp = require("gulp");
// POST CSS
var postcss = require("gulp-postcss");
var cssnext = require("postcss-cssnext");
var cssnano = require("cssnano");
var pxtorem = require("postcss-pxtorem");
var fontmagician = require("postcss-font-magician");

gulp.task("postcss", function() {
  var plugins = [
    pxtorem({
      replace: false
    }),
    fontmagician({
      variants: {
        "Source Sans Pro": {
          "400": [],
          "700": []
        }
      },
      foundries: ["google"],
      display: "swap"
    }),
    cssnext({
      browsers: [
        "> 1%",
        "last 2 versions",
        "not ie <= 8"
      ]
    }),
    cssnano({
      preset: "default"
    })
  ];

  return gulp
    .src("./src/**/*.css")
    .pipe(postcss(plugins))
    .pipe(gulp.dest("./output/"));
});

gulp.task("default", ["postcss"]);
