import { useEffect, useRef, useState } from "react";
import useAudioStore from "@/store/audio";
// import { Input, Slider } from "@whoisryosuke/oat-milk-design";
import BitcrusherWorklet from "@/workers/bitcrusher.ts?url";
import wasm from "@/wasm/clawdio-bitcrusher.wasm?url";
import type {
  AudioWorkletEventMessage,
  BitcrusherOptions,
} from "@/workers/types";

type Props = {};

const Bitcrusher = (props: Props) => {
  const [loaded, setLoaded] = useState(false);
  const [bits, setBits] = useState(4);
  const [normfreq, setNormfreq] = useState(0.1);
  const nodeRef = useRef<AudioWorkletNode | null>(null);
  const { audioCtx, addAudioNode, removeAudioNode } = useAudioStore();

  const handleNodeMessage = (e: any) => {
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

  const createNode = async () => {
    // Fetch the WASM module
    const response = await fetch(wasm);
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
  };

  useEffect(() => {
    if (!audioCtx || loaded) return;
    createNode();

    return () => {
      if (nodeRef.current) removeAudioNode("bitcrusher");
      nodeRef.current?.disconnect();
    };
  }, [audioCtx]);

  const handleBitsChange = (sliderValue: number) => {
    console.log(sliderValue);
    setBits(sliderValue);

    if (!nodeRef.current) return;
    nodeRef.current.port.postMessage({ type: "set-bits", data: sliderValue });
    // if (nodeRef.current) nodeRef.current.gain.value = newGain;
  };
  const handleNormfreqChange = (sliderValue: number) => {
    console.log(sliderValue);
    setNormfreq(sliderValue);
    console.log("normfreq", sliderValue);

    if (!nodeRef.current) return;
    nodeRef.current.port.postMessage({
      type: "set-normfreq",
      data: sliderValue,
    });
  };

  return <div></div>;
};

export default Bitcrusher;
