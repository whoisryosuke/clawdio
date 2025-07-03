// When we import WASM in worker, wasm-pack creates an initialization wrapper using `new URL`.
// Vite transforms any `new URL()` and generates base64 - @see: https://vite.dev/guide/assets.html#new-url-url-import-meta-url
// That increases bundle by doubling up WASM (once as `.wasm` and another as base64)
// This prevents that by finding any instances and removing them.
const preserveUrlPlugin = {
  name: "worker-preserve-url",
  transform(code) {
    if (code.includes("new URL(")) {
      const searchTerm = /new URL\([^)]*\)/g;
      const newCode = code.replace(searchTerm, "false");
      return {
        code: newCode,
        map: null,
      };
    }
  },
};

export default preserveUrlPlugin;
