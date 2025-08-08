import { type ComponentProps, useCallback, useEffect, useRef } from "react";
import styled from "@emotion/styled";
import map from "@site/src/utils/map";
import { useColorMode } from "@docusaurus/theme-common";

// Assuming numbers are 0-1
type GraphData = number[];
const DEFAULT_AUDIO_HEIGHT = 128;
const CUSTOM_COLORS = {
  clawdio: {
    line: "rgba(188, 47, 47, 1)",
    bg: { light: "rgba(242, 213, 213, 1)", dark: "rgba(19, 5, 5, 1)" },
  },
};

type Props = {
  analyser: AnalyserNode;
  animated?: boolean;
  color?: string;
  fps?: number;
};

const LineGraph = ({
  analyser,
  animated,
  color = "blue",
  fps,
  ...props
}: Props) => {
  const { colorMode } = useColorMode();
  const defaultBgColor = colorMode === "dark" ? "#111" : "#EEE";
  const bgColor =
    color in CUSTOM_COLORS
      ? colorMode === "dark"
        ? CUSTOM_COLORS[color].bg.dark
        : CUSTOM_COLORS[color].bg.light
      : defaultBgColor;
  const lineColor = color in CUSTOM_COLORS ? CUSTOM_COLORS[color].line : color;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const data = useRef<Uint8Array>(new Uint8Array(0));
  const animationRef = useRef<ReturnType<typeof requestAnimationFrame> | null>(
    null
  );
  const prevTime = useRef(0);

  const draw = useCallback(
    (now: number) => {
      // Draw to a specific FPS if needed
      if (fps && animated) {
        const fpsInterval = 1000 / fps;
        const elapsed = now - prevTime.current;
        // If we haven't elapsed enough time, keep looping
        if (elapsed < fpsInterval) {
          return (animationRef.current = requestAnimationFrame(draw));
        } else {
          prevTime.current = now - (elapsed % fpsInterval);
        }
      }

      if (!canvasRef.current) return;
      const canvas = canvasRef.current;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;

      // Get audio data
      if (!analyser || !data.current) return;

      // Update waveform data as a ref
      if (data.current.length == 0) {
        const newBufferLength = analyser.frequencyBinCount;
        data.current = new Uint8Array(newBufferLength);
      }
      analyser.getByteTimeDomainData(data.current);

      // Clear drawing
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);

      ctx.beginPath();
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = lineColor;
      for (let i = 0; i < canvasWidth; i++) {
        const index = Math.floor(
          map(i, 0, canvasWidth, 0, data.current.length)
        );
        const x = i;
        // We scale the audio values to 0-1 to make it easier
        const amplitude = map(
          data.current[index],
          DEFAULT_AUDIO_HEIGHT - 20,
          DEFAULT_AUDIO_HEIGHT + 20,
          0,
          1
        );
        const y = (amplitude * canvasHeight) / 2 + canvasHeight / 4;
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }

      ctx.stroke();

      if (animated) animationRef.current = requestAnimationFrame(draw);
    },
    [data, lineColor, bgColor, animated, fps]
  );

  useEffect(() => {
    animationRef.current = requestAnimationFrame(draw);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [draw, lineColor, bgColor, fps]);

  return <canvas ref={canvasRef} {...props} />;
};

export default LineGraph;
