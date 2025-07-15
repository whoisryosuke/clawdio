import { readdirSync, statSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

export const getAllModules = () =>
  readdirSync("./modules").filter((value) => {
    // Get current directory equivalent for ES modules
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    // Build the path from scripts/ to modules/
    const modulePath = path.resolve(__dirname, "..", "modules", value);
    const stats = statSync(modulePath);
    return stats.isDirectory();
  });
