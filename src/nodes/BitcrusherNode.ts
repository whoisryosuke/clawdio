import BitcrusherWorklet from "@/workers/bitcrusher.ts?worker&url";
import "@/assets/modules/clawdio_bitcrusher_bg.wasm?no-inline";
import BitcrusherWasmPath from "@/assets/modules/clawdio_bitcrusher_bg.wasm?url";
import type {
  AudioWorkletEventMessage,
  BitcrusherOptions,
} from "@/workers/types";
import { CustomAudioWorkletNode } from "./types";

export type BitcrusherNode = CustomAudioWorkletNode & {
  setBits: (newBits: number) => void;
  setNormfreq: (newFreq: number) => void;
};

/**
 * Creates a Bitcrusher audio worklet node and initializes it's WASM module.
 * Returns the AudioWorkletNode and helpful setter functions for parameters
 * @returns BitcrusherNode
 */
const createBitcrusherNode = async (
  audioCtx: AudioContext,
  bits = 4,
  normfreq = 0.1
) => {
  let nodeRef: AudioWorkletNode | null = null;

  const handleNodeMessage = (e: MessageEvent) => {
    const event = e.data as AudioWorkletEventMessage<number>;
    // WASM was loaded - so lets initialize our Rust-based pitch detection module
    if (event.type === "wasm-loaded") {
      console.log("wasm loaded");
      if (!nodeRef) return;

      // The config for our underyling Rust module
      const data: BitcrusherOptions = {
        bits,
      };

      console.log("init bitcrusher rust module");
      // Send the WASM payload to Audio processor
      nodeRef.port.postMessage({
        type: "init-module",
        data,
      });
    }
  };

  const createNode = async () => {
    // Fetch the WASM module
    const response = await fetch(BitcrusherWasmPath);
    const wasmData = await response.arrayBuffer();

    // Create the worklet
    console.log("creating worklet...");
    try {
      // Resolve the URL relative to the current module
      await audioCtx.audioWorklet.addModule(BitcrusherWorklet);
      nodeRef = new AudioWorkletNode(audioCtx, "bitcrusher");

      // Send the WASM payload to Audio processor
      nodeRef.port.postMessage({ type: "init-wasm", data: wasmData });
      // Get messages from the worklet/processor
      nodeRef.port.onmessage = handleNodeMessage;

      // Set initial values
      setNormfreq(normfreq);

      console.log("created worklet node", nodeRef);

      nodeRef.addEventListener("processorerror", (e) =>
        console.error("Audio Worklet processing error", e)
      );
    } catch (e) {
      console.log("failed to create worklet", e);
    }
  };

  // Setter functions to communicate with worklet params
  const setBits = (newBits: number) => {
    if (!nodeRef) return;
    nodeRef.port.postMessage({ type: "set-bits", data: newBits });
  };

  const setNormfreq = (newFreq: number) => {
    if (!nodeRef) return;
    nodeRef.port.postMessage({ type: "set-normfreq", data: newFreq });
  };

  // Create the node and return it
  await createNode();

  if (!nodeRef) {
    throw "Couldn't create node, try again";
  }

  return {
    node: nodeRef,
    setBits,
    setNormfreq,
  } as BitcrusherNode;
};

export default createBitcrusherNode;
