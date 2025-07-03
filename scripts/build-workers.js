import { build } from "vite";
import path from "path";
import { readdirSync } from "fs";

async function buildWorkers() {
  try {
    // Find all TypeScript files in src/workers/
    const workerPath = "src/workers/";
    const allFiles = readdirSync(workerPath);
    const workerFiles = allFiles.filter(
      (file) =>
        file.endsWith(".ts") && !file.endsWith(".d.ts") && file !== "types.ts"
    );

    if (workerFiles.length === 0) {
      console.log("No TypeScript files found in src/workers/");
      return;
    }

    console.log(`Building ${workerFiles.length} worker files...`);

    // Build each worker file individually
    for (const file of workerFiles) {
      const name = path.basename(file, ".ts");
      console.log(`Building ${name}...`);

      await build({
        plugins: [], // Explicitly disable all plugins (including vite-plugin-dts)
        assetsInclude: [], // Don't include WASM in this build
        build: {
          lib: {
            entry: path.resolve(workerPath, file),
            formats: ["es"],
            fileName: () => `${name}.js`,
          },
          outDir: "public/workers/",
          emptyOutDir: false,
          rollupOptions: {
            output: {
              entryFileNames: `${name}.js`,
            },
          },
          assetsInlineLimit: 0, // Disable asset inlining completely
          copyPublicDir: false, // This prevents `wasm` files from being re-copied
        },
        esbuild: {
          target: "es2020",
        },
        logLevel: "warn", // Reduce log noise for multiple builds
        configFile: false, // Don't load vite.config.ts
      });
    }
  } catch (error) {
    console.error("❌ Build failed:", error);
  }
}

buildWorkers();
