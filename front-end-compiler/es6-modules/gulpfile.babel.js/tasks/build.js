import { series } from "gulp";
import styles from "./build/styles";

const build = series(styles);

build.description = "Build assets";
build.displayName = "build";

export default build;
