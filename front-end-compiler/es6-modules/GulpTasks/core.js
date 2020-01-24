import { parallel, series } from "gulp";
import styles from "./core/styles";
import serve from "./serve";
import watch from "./core/watch";

const develop = parallel(serve, watch);
const build = series(styles);

develop.description = "Create server and watch core styles";
develop.displayName = "core-develop";

build.description = "Build core styles";
build.displayName = "core-build";

const core = {
  develop,
  build
};

export default core;
