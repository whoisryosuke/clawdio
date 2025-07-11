import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  server: {
    fs: {
      // Allow serving files from one level up from the project root
      allow: ["..", "./node_modules"],
    },
  },
  assetsInclude: ["**/*.wasm"], // Ensure WASM files are treated as assets
});
