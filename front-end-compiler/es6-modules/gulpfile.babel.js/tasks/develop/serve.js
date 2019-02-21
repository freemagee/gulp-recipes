import browserSync from "browser-sync";

// Browsersync init
browserSync.create();

const serve = () => {
  browserSync.init({
    proxy: "http://localhost:1313/"
  });
};

export default serve;
