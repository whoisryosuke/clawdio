import useAudioStore from "@site/src/store/audio";
import React, { useEffect, useRef, useState, type RefObject } from "react";
import LineGraph from "../../audio/LineGraph";

const DEFAULT_AUDIO_HEIGHT = 128;

type Props = {
  analyser: AnalyserNode;
  fps?: number;
  color?: string;
};

const Waveform = ({ analyser, fps, color }: Props) => {
  return (
    <LineGraph
      analyser={analyser}
      width={350}
      height={150}
      fps={fps}
      color={color}
      animated
    />
  );
};

export default Waveform;
