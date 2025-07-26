import useAudioStore from "@site/src/store/audio";
import React, { useEffect, useRef, useState } from "react";
import WaterfallViz from "./WaterfallViz";

type Props = {};

function generateInitialSignalData() {
  // return new Array(1024).fill(0).map((_, index) => Math.sin(index * 0.0001));
  return new Array(2048).fill(0);
}

const DEFAULT_SIGNAL = generateInitialSignalData();

const MastheadMusicWaterfall = (props: Props) => {
  const [data, setData] = useState([...DEFAULT_SIGNAL]);
  const animationRef = useRef<ReturnType<typeof requestAnimationFrame> | null>(
    null
  );
  const prevTime = useRef(0);

  const draw = (now: number) => {
    // Generate more sine wave samples
    const newValue = Math.sin(now * 0.0005);
    // const effectValue = Math.random() * 2 - 1;
    // const effectValue = newValue * 10;
    const effectValue = Math.sin(now * 0.005) * 10;
    setData((prevState) => [newValue, effectValue, ...prevState.slice(0, -1)]);

    animationRef.current = requestAnimationFrame(draw);
  };
  console.log("data", data);

  useEffect(() => {
    animationRef.current = requestAnimationFrame(draw);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [draw]);

  return (
    <div style={{ width: "100%", height: "90vh", display: "flex" }}>
      <WaterfallViz data={data} />
    </div>
  );
};

export default MastheadMusicWaterfall;
