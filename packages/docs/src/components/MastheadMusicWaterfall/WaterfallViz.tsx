import { type ComponentProps, useCallback, useEffect, useRef } from "react";
import map from "../../utils/map";
import { useColorMode } from "@docusaurus/theme-common";
import lerp from "@site/src/utils/lerp";

// Assuming numbers are 0-1
type GraphData = number[];
const DEFAULT_AUDIO_HEIGHT = 1;

type Props = {
  data: GraphData;
};

// We take the canvas width and divide it by this number
// to determine the number of lines on screen (lower = more lines, higher = less lines)
const LINE_DIVISOR = 100;

const WaterfallViz = ({ data, ...props }: Props) => {
  const { colorMode } = useColorMode();
  const bgColor = colorMode === "dark" ? "#111" : "#EEE";
  const lineColor = colorMode === "dark" ? "blue" : "blue";
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const draw = useCallback(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    // Clear drawing
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    ctx.beginPath();
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = lineColor;

    for (
      let lineIndex = 0;
      lineIndex < (canvasWidth * 2) / LINE_DIVISOR;
      lineIndex++
    ) {
      for (let i = 0; i < canvasHeight; i++) {
        const index =
          Math.floor(map(i, 0, canvasHeight, 0, data.length / 2)) * 2;
        const effectedValue = data[index + 1];
        const normalValue = data[index];
        const currentValue = lerp(
          normalValue,
          effectedValue,
          i / canvasHeight - 0.5
        );

        const y = i;
        // We scale the audio values to 0-1 to make it easier
        const amplitude = map(currentValue, -1, 1, 0, 1);
        const scaleAmplitude = 42;
        const scaledAmplitude = amplitude * scaleAmplitude;
        // Shifts to the left to fill in screen more (since we have double the lines we need anyway)
        const offset = canvasWidth / 1.5;
        // Distance between each line
        const lineOffset = lineIndex * LINE_DIVISOR;
        const x = scaledAmplitude / 2 + lineOffset - offset;
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
    }

    ctx.stroke();
  }, [data, colorMode]);

  useEffect(() => {
    draw();
  }, [data, colorMode]);

  // Function to resize the canvas
  function resizeCanvas() {
    if (!canvasRef.current) return;
    canvasRef.current.width = window.innerWidth;
    canvasRef.current.height = window.innerHeight;
  }

  useEffect(() => {
    resizeCanvas();
    // Add an event listener to resize the canvas when the window is resized
    window.addEventListener("resize", resizeCanvas);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={"100%"}
      height={"100%"}
      style={{ flex: 1 }}
      {...props}
    />
  );
};

export default WaterfallViz;
