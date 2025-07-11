import { execFileSync } from "child_process";
import { readdirSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const log = (...props) => console.log("[CLAWDIO/RELEASE]", ...props);

// Get all modules
const modules = readdirSync("./modules");
log("Processing Rust modules: ", modules);

function releaseModules() {
  log("Starting release process 🚀");

  modules.forEach((moduleName) => {
    // Get current directory equivalent for ES modules
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    // Build the path from scripts/ to modules/
    const modulePath = path.resolve(
      __dirname,
      "..",
      "modules",
      moduleName,
      "pkg"
    );
    // const modulePath = `./modules/${moduleName}/pkg`;
    log("Trying to release module", moduleName, modulePath);

    try {
      execFileSync(
        "npm",
        ["publish", "--registry", "https://registry.npmjs.org/"],
        {
          cwd: modulePath,
          stdio: "inherit", // show output in console
          env: {
            ...process.env,
            NODE_AUTH_TOKEN: process.env.NODE_AUTH_TOKEN,
          },
        }
      );
      log("Successfully released module", moduleName);
    } catch (e) {
      log("Failed to release module", moduleName);
    }
  });
}

releaseModules();
