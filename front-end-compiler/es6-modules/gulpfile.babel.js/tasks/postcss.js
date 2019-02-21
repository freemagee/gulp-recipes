import fontMagician from "postcss-font-magician";
import postcssPresetEnv from "postcss-preset-env";
import cssnano from "cssnano";

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
const build = [fontMagician(fontMagicianConfig), postcssPresetEnv(), cssnano()];
const dev = [fontMagician(fontMagicianConfig), postcssPresetEnv()];

const processors = {
  build,
  dev
};

export default processors;
