const basePaths = {
  src: "./src/",
  dest: "./static/"
};
const paths = {
  styles: {
    src: `${basePaths.src}scss`,
    files: `${basePaths.src}scss/**/*.scss`,
    dest: `${basePaths.dest}css`,
    data: `./data/css`,
    del: `${basePaths.dest}css/**/*`
  }
};

export default paths;
