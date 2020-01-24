/* eslint no-console: 0 */
import { task } from "gulp";
import colors from "ansi-colors";
import core from "./GulpTasks/core";

// Define tasks

task(core.develop);
task(core.build);

// Default/fallback task

function defaultTask() {
  return new Promise(resolve => {
    const message = `${colors.white.bgOrange(
      "Action:"
    )} To see all tasks, type ${colors.cyan("gulp -T")}`;

    console.log(message);
    resolve();
  });
}

export default defaultTask;
