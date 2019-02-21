import { parallel } from "gulp";
import serve from "./develop/serve";
import watch from "./develop/watch";

const develop = parallel(serve, watch);

develop.description = "Create server and watch assets";
develop.displayName = "develop";

export default develop;
