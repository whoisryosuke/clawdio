import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import { resolve } from "node:path";
import { name } from "./package.json";
import tsconfigPaths from "vite-tsconfig-paths";
import preserveUrlPlugin from "./scripts/vite-preserve-url";

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  plugins: [
    react(),
    dts({
      rollupTypes: true, // Bundles all types into a single file
    }),
    tsconfigPaths(),
  ],

  // Plugins that only run on workers
  worker: {
    plugins: () => [preserveUrlPlugin],
  },

  // Make sure to include `.wasm` files we copied to `/public` in final build
  assetsInclude: ["**/*.wasm"],

  build: {
    lib: {
      entry: resolve("src", "index.ts"),
      name,
      formats: ["es", "umd"],
      fileName: (format) => `${name}.${format}.js`,
    },

    assetsInlineLimit: 0, // disables base64 inlining. prob not necessary.

    rollupOptions: {
      external: [
        "react",
        "react/jsx-runtime",
        "react-dom",
        "styled-components",
      ],
      output: {
        globals: {
          react: "React",
          "styled-components": "styled-components",
          "react-dom": "ReactDOM",
          "react/jsx-runtime": "react/jsx-runtime",
        },
      },
    },
  },
});
