import useAudioStore from "@site/src/store/audio";
import React, { useEffect } from "react";

type Props = {};

const MastheadMusicWaterfall = (props: Props) => {
  const { context, setContext, addNode, setChain } = useAudioStore();

  // Create audio context initially
  // @TODO: Move this to a separate service
  useEffect(() => {
    if (!context) {
      const audioCtx = new AudioContext();
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
    const analyser = context.createAnalyser();
    analyser.fftSize = 1024;

    // Add nodes to store
    addNode("osc", osc);
    addNode("analyser", analyser);

    // Setup the audio chain
    setChain(["osc", "analyser"]);
  }, [context]);

  return <div></div>;
};

export default MastheadMusicWaterfall;
