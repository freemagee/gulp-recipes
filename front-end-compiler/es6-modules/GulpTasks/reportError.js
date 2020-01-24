/* eslint no-console: 0 */
import notify from "gulp-notify";
import colors from "ansi-colors";
import beeper from "beeper";

// Error handler
// Heavily inspired by: https://github.com/mikaelbr/gulp-notify/issues/81#issuecomment-100422179
const reportError = function reportErrorFn(error) {
  const messageOriginal = error.messageOriginal ? error.messageOriginal : "";

  notify({
    title: `Task Failed [${error.plugin}]`,
    message: messageOriginal,
    sound: "Sosumi" // See: https://github.com/mikaelbr/node-notifier#all-notification-options-with-their-defaults
  }).write(error);

  beeper(); // Beep 'sosumi' again

  // Inspect the error object
  // console.log(error);

  // Easy error reporting
  // console.log(error.toString());

  // Pretty error reporting
  let report = "";
  const chalk = colors.white.bgRed;

  report += `${chalk("TASK:")} [${error.plugin}]\n`;

  if (error.file) {
    report += `${chalk("FILE:")} ${error.file}\n`;
  }

  if (error.line) {
    report += `${chalk("LINE:")} ${error.line}\n`;
  }

  report += `${chalk("PROB:")} ${error.message}\n`;

  console.error(report);

  // Prevent the 'watch' task from stopping
  this.emit("end");
};

export default reportError;
