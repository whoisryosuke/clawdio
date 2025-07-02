import { useCallback, useEffect, useRef, useState } from "react";
import useAudioStore from "@/store/audio";
// import { Input, Slider } from "@whoisryosuke/oat-milk-design";
import BitcrusherWorklet from "@/workers/bitcrusher.ts?url";
// import wasm from "clawdio-bitcrusher/clawdio_bitcrusher_bg.wasm?url";
import type {
  AudioWorkletEventMessage,
  BitcrusherOptions,
} from "@/workers/types";

type Props = {
  bits?: number;
  normfreq?: number;
};

const Bitcrusher = ({ bits = 4, normfreq = 0.1 }: Props) => {
  const [loaded, setLoaded] = useState(false);
  const nodeRef = useRef<AudioWorkletNode | null>(null);
  const { audioCtx, addAudioNode, removeAudioNode } = useAudioStore();

  const handleNodeMessage = (e: MessageEvent) => {
    const event = e.data as AudioWorkletEventMessage<number>;
    // WASM was loaded - so lets initialize our Rust-based pitch detection module
    if (event.type === "wasm-loaded") {
      console.log("wasm loaded");
      if (!nodeRef.current) return;

      // The config for our underyling Rust module
      const data: BitcrusherOptions = {
        bits: 4,
      };

      console.log("init bitcrusher rust module");
      // Send the WASM payload to Audio processor
      nodeRef.current.port.postMessage({
        type: "init-module",
        data,
      });
    }
  };

  const createNode = useCallback(async () => {
    // Fetch the WASM module
    const path = "./modules/clawdio_bitcrusher_bg.wasm";
    const response = await fetch(path);
    const wasmData = await response.arrayBuffer();

    // Create the worklet
    console.log("creating worklet...");
    try {
      await audioCtx.audioWorklet.addModule(BitcrusherWorklet);
      nodeRef.current = new AudioWorkletNode(audioCtx, "bitcrusher");

      // Send the WASM payload to Audio processor
      nodeRef.current.port.postMessage({ type: "init-wasm", data: wasmData });
      // Get messages from the worklet/processor
      nodeRef.current.port.onmessage = handleNodeMessage;

      console.log("created worklet node", nodeRef.current);
      addAudioNode("bitcrusher", nodeRef.current);
      setLoaded(true);

      nodeRef.current.addEventListener("processorerror", (e) =>
        console.error("Audio Worklet processing error", e)
      );
    } catch (e) {
      console.log("failed to create worklet", e);
    }
  }, [addAudioNode, audioCtx]);

  useEffect(() => {
    if (!audioCtx || loaded) return;
    createNode();

    return () => {
      if (nodeRef.current) removeAudioNode("bitcrusher");
      nodeRef.current?.disconnect();
    };
  }, [audioCtx, loaded, createNode, removeAudioNode]);

  useEffect(() => {
    if (!nodeRef.current) return;
    nodeRef.current.port.postMessage({ type: "set-bits", data: bits });
  }, [bits]);

  useEffect(() => {
    if (!nodeRef.current) return;
    nodeRef.current.port.postMessage({ type: "set-normfreq", data: normfreq });
  }, [normfreq]);

  return <></>;
};

export default Bitcrusher;
