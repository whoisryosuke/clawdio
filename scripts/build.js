import { execFileSync } from "child_process";
import { copyFileSync, readdirSync } from "fs";
import path, { dirname } from "path";

const args = process.argv.slice(2); // Exclude the first two elements (node path and script path)

if (args.length > 0) {
  console.log("First argument:", args[0]);
}

/**
 * This file handles building the Rust code into WASM and JS,
 * and copies the WASM to the root asset folder (`/public`)
 * so we can distribute them with library.
 */

const log = (...props) => console.log("[CLAWDIO/BUILD]", ...props);

log("Starting build");

// 1️⃣ Build all WASM modules

// Get all modules
const modules = readdirSync("./modules");
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

function releaseModules() {
  log("Starting release process 🚀");

  modules.forEach((moduleName) => {
    // wasm-pack build --target web
    const modulePath = `./modules/${moduleName}/pkg`;

    execFileSync("npm publish --access public", {
      cwd: path.join(modulesDir, modulePath),
      stdio: "inherit", // show output in console
      env: {
        ...process.env,
        NODE_AUTH_TOKEN: process.env.NODE_AUTH_TOKEN,
      },
    });
  });
}

// Handle release
if (args.length > 0 && args[0] == "--release") {
  releaseModules();
}
