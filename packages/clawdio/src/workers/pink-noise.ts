import init, { PinkNoiseModule } from "clawdio-pink-noise";
import type {
  AudioWorkletEventMessage,
  AudioWorkletInitWasmEvent,
} from "./types";
import { initWasm } from "./utils";

export interface PinkNoiseEventInitModule
  extends AudioWorkletEventMessage<PinkNoiseOptions> {
  type: "init-module";
  data: PinkNoiseOptions;
}

export type PinkNoiseOptions = {
  bufferSize: number;
};

class PinkNoiseWorklet extends AudioWorkletProcessor {
  worklet: PinkNoiseModule | null = null;
  bufferSize = 4096;

  constructor() {
    super();

    this.port.onmessage = (event) => this.onmessage(event.data);
  }

  onmessage = (event: AudioWorkletInitWasmEvent | PinkNoiseEventInitModule) => {
    // Handle loading WASM module
    initWasm(event as AudioWorkletInitWasmEvent, init, this.port);

    if (event.type === "init-module") {
      const { bufferSize = 4096 } = event.data;
      this.worklet = PinkNoiseModule.new(bufferSize);
    }
  };

  process(_: Float32Array[][], outputs: Float32Array[][]) {
    // Check if we have worklet initialized
    if (this.worklet == null) return true;

    let processing;
    try {
      // Process samples using Rust WASM module
      processing = this.worklet.process();
    } catch (e) {
      console.log("processing error", e);
    }

    if (!processing) return true;
    // Make sure you loop through each output value and assign it manually
    // can't just assign a whole array
    processing.forEach((val, index) => (outputs[0][0][index] = val));

    return true;
  }
}

registerProcessor("clawdio-pink-noise", PinkNoiseWorklet);
