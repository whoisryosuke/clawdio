import init, { BitcrusherModule } from "clawdio-bitcrusher";
import type {
  BitcrusherEventInitModule,
  BitcrusherEventInitWasm,
  BitcrusherEventSetBits,
  BitcrusherEventSetNormfreq,
} from "./types";

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
      | BitcrusherEventInitWasm
      | BitcrusherEventInitModule
      | BitcrusherEventSetBits
      | BitcrusherEventSetNormfreq
  ) => {
    console.log("event in module", event, event.type, event.data);
    // Handle loading WASM module
    if (event.type === "init-wasm") {
      init(WebAssembly.compile(event.data)).then(() => {
        this.port.postMessage({ type: "wasm-loaded" });
      });
    }
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

  process(inputs: Float32Array[][], outputs: Float32Array[][], parameters) {
    // Check if we have worklet initialized
    if (this.worklet == null) return true;

    inputs.forEach((channels, channelIndex) => {
      channels.forEach((inputSamples, sampleIndex) => {
        const processing = this.worklet.process(inputSamples, this.normfreq);
        if (channelIndex === 0)
          console.log("output before", inputSamples, processing);

        // Make sure you loop through each output value and assign it manually
        // can't just assign a whole array
        processing.forEach(
          (val, index) => (outputs[channelIndex][sampleIndex][index] = val)
        );

        if (channelIndex === 0)
          console.log("output after", outputs[channelIndex][sampleIndex]);
      });
    });

    // outputs = inputs;

    return true;
  }
}

registerProcessor("bitcrusher", BitcrusherWorklet);
