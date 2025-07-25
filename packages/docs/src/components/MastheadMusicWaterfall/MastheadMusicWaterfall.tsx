import useAudioStore from "@site/src/store/audio";
import React, { useEffect } from "react";
import WaterfallViz from "./WaterfallViz";

type Props = {};

const MastheadMusicWaterfall = (props: Props) => {
  const { context, setContext, addNode, setChain } = useAudioStore();

  // Create audio context initially
  // @TODO: Move this to a separate service
  useEffect(() => {
    if (!context) {
      const audioCtx = new AudioContext();
      audioCtx.resume();

      console.log("audioCtx", audioCtx.state);
      setContext(audioCtx);
    }
    return () => {
      setContext(null);
    };
  }, []);

  // Create audio signal
  useEffect(() => {
    if (!context) return;

    // Create audio nodes
    const osc = context.createOscillator();
    osc.start();
    const analyser = context.createAnalyser();
    analyser.fftSize = 1024;

    // Add nodes to store
    addNode("osc", osc);
    addNode("analyser", analyser);

    // Setup the audio chain
    setChain(["osc", "analyser"]);
  }, [context]);

  return (
    <div>
      <WaterfallViz />
    </div>
  );
};

export default MastheadMusicWaterfall;
