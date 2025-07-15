import { AudioWorkletInitWasmEvent } from "./types";

export const initWasm = (
  event: AudioWorkletInitWasmEvent,
  init: (module: Promise<WebAssembly.Module>) => Promise<unknown>,
  port: MessagePort
) => {
  // Handle loading WASM module
  if (event.type === "init-wasm") {
    init(WebAssembly.compile(event.data)).then(() => {
      port.postMessage({ type: "wasm-loaded" });
    });
  }
};
