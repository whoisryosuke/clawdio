// Custom Vite plugin to preserve new URL() calls for WASM files
export const preserveUrlImportsPlugin = {
  name: "preserve-url-imports",

  resolveId(id) {
    // Mark WASM files as external so they don't get bundled
    if (id.includes(".wasm")) {
      return { id, external: true };
    }
  },

  transform(code, id) {
    // Don't transform files that contain WASM URL references
    if (code.includes("new URL(") && code.includes(".wasm")) {
      console.log(`Preserving URL calls in: ${id}`);
      // Return the code unchanged to prevent Vite from transforming new URL() calls
      return {
        code: code,
        map: null,
      };
    }
    // Let other files be transformed normally
    return null;
  },

  generateBundle(options, bundle) {
    // Remove any WASM assets that somehow made it into the bundle
    Object.keys(bundle).forEach((fileName) => {
      if (fileName.includes(".wasm")) {
        console.log(`Removing WASM asset from bundle: ${fileName}`);
        delete bundle[fileName];
      }
    });
  },
};
