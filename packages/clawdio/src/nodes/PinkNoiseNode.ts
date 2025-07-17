import PinkNoiseWorklet from "@/workers/pink-noise.ts?worker&url";
import "clawdio-pink-noise/clawdio_pink_noise_bg.wasm?no-inline";
import PinkNoiseWasmPath from "clawdio-pink-noise/clawdio_pink_noise_bg.wasm?url&no-inline";
import { CustomAudioWorkletNode } from "./types";
import { assertNode, createWorkletNode } from "./utils";

export type PinkNoiseNode = CustomAudioWorkletNode;

/**
 * Creates a PinkNoise audio worklet node and initializes it's WASM module.
 * Returns the AudioWorkletNode and helpful setter functions for parameters
 * @returns PinkNoiseNode
 */
const createPinkNoiseNode = async (
  audioCtx: AudioContext,
  bufferSize = 4096
) => {
  let nodeRef: AudioWorkletNode | null = null;

  // Create the node and return it
  nodeRef = await createWorkletNode(
    audioCtx,
    PinkNoiseWasmPath,
    PinkNoiseWorklet,
    "clawdio-pink-noise",
    {
      bufferSize,
    }
  );

  assertNode(nodeRef, "PinkNoise");

  return {
    node: nodeRef,
  } as PinkNoiseNode;
};

export default createPinkNoiseNode;
