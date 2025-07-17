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

      console.log("wasm initialized - test process", this.worklet.process_vec);

      console.log(
        "wasm initialized - test process function",
        this.worklet.process_vec()
      );
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

    console.log("processed audio", processing);

    if (!processing) return true;
    // Make sure you loop through each output value and assign it manually
    // can't just assign a whole array
    processing.forEach((val, index) => (outputs[0][0][index] = val));

    // outputs.forEach((channels, channelIndex) => {
    //   channels.forEach((_, sampleIndex) => {
    //     // We check again since TS insists (and maybe it changes over course of loop?)
    //     if (this.worklet == null) return true;
    //   });
    // });

    // outputs = inputs;

    return true;
  }
}

registerProcessor("clawdio-pink-noise", PinkNoiseWorklet);
