import postcssPresetEnv from "postcss-preset-env";
import cssnano from "cssnano";
import pxtorem from "postcss-pxtorem";
import fontMagician from "postcss-font-magician";

const fontMagicianConfig = {
  variants: {
    Montserrat: {
      "400": ["woff", "woff2"],
      "400 italic": ["woff", "woff2"],
      "600": ["woff", "woff2"],
      "700": ["woff", "woff2"]
    },
    "Ubuntu Mono": {
      "400": ["woff", "woff2"],
      "400 italic": ["woff", "woff2"],
      "700": ["woff", "woff2"]
    }
  },
  foundries: "google",
  protocol: "https:"
};
const nanoOptions = {
  zindex: false
};
const pxToRemOptions = {
  replace: false,
  propList: ["font-size"]
};
const core = [
  pxtorem(pxToRemOptions),
  postcssPresetEnv(),
  cssnano(nanoOptions),
  fontMagician(fontMagicianConfig)
];
const processors = {
  core
};

export default processors;
