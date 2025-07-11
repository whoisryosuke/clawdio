import { LineGraph } from "@whoisryosuke/oat-milk-design";
import React, { useEffect, useRef, useState, type RefObject } from "react";
import mapRange from "../../utils/mapRange";
import useAudioStore from "../../store/audio";

const DEFAULT_AUDIO_HEIGHT = 128;

type Props = {};

const Waveform = ({ ...props }: Props) => {
  const [loaded, setLoaded] = useState(false);
  const [time, setTime] = useState(0);
  const { audioCtx, addAudioNode, removeAudioNode } = useAudioStore();
  const analyser = useRef<AnalyserNode>(null);
  const dataArray = useRef<Uint8Array>(new Uint8Array(0));
  const animationRef = useRef<ReturnType<typeof requestAnimationFrame> | null>(
    null
  );

  useEffect(() => {
    if (!audioCtx || loaded) return;
    analyser.current = audioCtx.createAnalyser();

    // Configure analyser
    analyser.current.fftSize = 1024;
    const newBufferLength = analyser.current.frequencyBinCount;
    dataArray.current = new Uint8Array(newBufferLength);

    // Connect this audio node to the output
    addAudioNode("analyser", analyser.current);
    setLoaded(true);

    return () => {
      removeAudioNode("analyser");
    };
  }, [audioCtx]);

  // Animate waveform
  const animate = (delta: number) => {
    if (!analyser.current || !dataArray.current) return;

    // Update waveform data as a ref
    analyser.current.getByteTimeDomainData(dataArray.current);
    // Force React update
    setTime(delta);

    animationRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  const graph: number[] = [];
  dataArray.current.forEach((data) =>
    graph.push(
      mapRange(data, DEFAULT_AUDIO_HEIGHT - 20, DEFAULT_AUDIO_HEIGHT + 20, 0, 1)
    )
  );

  return <LineGraph data={graph} color={"blue"} width={400} height={300} />;
};

export default Waveform;
