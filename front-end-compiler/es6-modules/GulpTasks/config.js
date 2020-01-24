// Match the proxy against IIS port # or whatever is serving your local project
const proxy = "http://localhost:#####/";
const basePaths = {
  src: "./Library/Stylesheets",
  dest: "./Library/Stylesheets"
};
const paths = {
  core: {
    src: `${basePaths.src}/SCSS/`,
    files: `${basePaths.src}/SCSS/**/*.scss`,
    dest: `${basePaths.dest}/CSS/`
  }
};

export { paths, proxy };
