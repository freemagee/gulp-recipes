/* eslint no-console: 0 */
import { task } from "gulp";
import colors from "ansi-colors";
import develop from "./tasks/develop";
import build from "./tasks/build";

// Define tasks

task(develop);
task(build);

// Default/fallback task

function defaultTask() {
  return new Promise(resolve => {
    const message = `${colors.white.bgBlue(
      "Action:"
    )} for task information type ${colors.cyan("gulp -T")}`;

    console.log(message);
    resolve();
  });
}

export default defaultTask;
