import { execFileSync } from "child_process";
import { getAllModules } from "./shared.js";

/**
 * This file handles building the Rust code into WASM and JS,
 * and copies the WASM to the root asset folder (`/public`)
 * so we can distribute them with library.
 */

const log = (...props) => console.log("[CLAWDIO/BUILD]", ...props);

log("Starting build");

// 1️⃣ Build all WASM modules

// Get all modules directories
const modules = getAllModules();
log("Processing Rust modules: ", modules);

modules.forEach((moduleName) => {
  // wasm-pack build --target web
  execFileSync("wasm-pack", [
    "build",
    `./modules/${moduleName}/`,
    "--target",
    "web",
  ]);
});

log("Build completed successfully 👏🎉");
