import init, { BitcrusherModule } from "clawdio-bitcrusher";
import type {
  AudioWorkletEventMessage,
  AudioWorkletInitWasmEvent,
} from "./types";
import { initWasm } from "./utils";

export interface BitcrusherEventInitModule
  extends AudioWorkletEventMessage<BitcrusherOptions> {
  type: "init-module";
  data: BitcrusherOptions;
}

export interface BitcrusherEventSetBits
  extends AudioWorkletEventMessage<number> {
  type: "set-bits";
  data: number;
}
export interface BitcrusherEventSetNormfreq
  extends AudioWorkletEventMessage<number> {
  type: "set-normfreq";
  data: number;
}

export type BitcrusherOptions = {
  bits: number;
};

class BitcrusherWorklet extends AudioWorkletProcessor {
  worklet: BitcrusherModule | null = null;
  bits = 4;
  normfreq = 0.1;

  constructor() {
    super();

    this.port.onmessage = (event) => this.onmessage(event.data);
  }

  onmessage = (
    event:
      | AudioWorkletInitWasmEvent
      | BitcrusherEventInitModule
      | BitcrusherEventSetBits
      | BitcrusherEventSetNormfreq
  ) => {
    // Handle loading WASM module
    initWasm(event as AudioWorkletInitWasmEvent, init, this.port);

    if (event.type === "init-module") {
      const { bits } = event.data;
      this.bits = bits;
      this.worklet = BitcrusherModule.new(bits);
    }

    // Setters for internal properties (since we can't mutate this directly)
    if (event.type === "set-bits") {
      this.bits = event.data;
      // @TODO: Update the underylinng module
    }
    if (event.type === "set-normfreq") {
      this.normfreq = event.data;
    }
  };

  process(inputs: Float32Array[][], outputs: Float32Array[][]) {
    // Check if we have worklet initialized
    if (this.worklet == null) return true;

    inputs.forEach((channels, channelIndex) => {
      channels.forEach((inputSamples, sampleIndex) => {
        // We check again since TS insists (and maybe it changes over course of loop?)
        if (this.worklet == null) return true;

        // Process samples using Rust WASM module
        const processing = this.worklet.process(inputSamples, this.normfreq);

        // Make sure you loop through each output value and assign it manually
        // can't just assign a whole array
        processing.forEach(
          (val, index) => (outputs[channelIndex][sampleIndex][index] = val)
        );
      });
    });

    // outputs = inputs;

    return true;
  }
}

registerProcessor("clawdio-bitcrusher", BitcrusherWorklet);
