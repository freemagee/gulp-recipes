import browserSync from "browser-sync";
import { proxy } from "./config";

// Browsersync init
browserSync.create();

const serve = () => {
  browserSync.init({
    proxy
  });
};

export default serve;
