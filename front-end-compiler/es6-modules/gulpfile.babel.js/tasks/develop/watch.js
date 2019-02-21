import { watch, series } from "gulp";
import notify from "gulp-notify";
import paths from "../paths";
import styles from "./styles";

// A change event function, displays which file changed
const changeEvent = (path, type) => {
  const filename = path.split("\\").pop();
  notify(`[watcher] File ${filename} was ${type}, compiling...`).write("");
};

const watcher = () => {
  watch(
    paths.styles.files,
    {
      delay: 500
    },
    series(styles)
  ).on("change", path => {
    changeEvent(path, "changed");
  });
};

export default watcher;
