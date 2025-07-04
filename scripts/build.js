import { execFileSync } from "child_process";
import { copyFileSync, readdirSync } from "fs";
import path from "path";

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

  // 2️⃣ Copy WASM files to `/public/modules` folder
  const wasmPath = `./modules/${moduleName}/pkg`;
  const files = readdirSync(wasmPath);
  const wasmFile = files.find((file) => file.endsWith(".wasm"));
  log(moduleName, "Found WASM file:", wasmFile);

  const wasmFilePath = path.join(wasmPath, wasmFile);
  const copyPath = path.join(`./src/assets/modules`, wasmFile);
  copyFileSync(wasmFilePath, copyPath);
  log(moduleName, "Copied WASM file to build folder", wasmFilePath, copyPath);
});

log("Build completed successfully 👏🎉");
