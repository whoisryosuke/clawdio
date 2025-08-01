import {
  type ComponentProps,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import map from "../../utils/map";
import { useColorMode } from "@docusaurus/theme-common";
import lerp from "@site/src/utils/lerp";
import "./styles/WaterfallViz.css";
import { useInView } from "motion/react";

function generateInitialSignalData() {
  // return new Array(1024).fill(0).map((_, index) => Math.sin(index * 0.0001));
  return new Array(2048 / 4).fill(0);
}

const DEFAULT_SIGNAL = generateInitialSignalData();

// Assuming numbers are 0-1
type GraphData = number[];
const DEFAULT_AUDIO_HEIGHT = 1;

type Props = {};

// We take the canvas width and divide it by this number
// to determine the number of lines on screen (lower = more lines, higher = less lines)
const LINE_DIVISOR = 50;
const CLAWDIO_BRAND = "#BC2F2F";
const CLAWDIO_LINE = "#711C1C";

const WaterfallViz = ({ ...props }: Props) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(containerRef);
  const isInViewRef = useRef(false);
  const data = useRef([...DEFAULT_SIGNAL]);
  const animationRef = useRef<ReturnType<typeof requestAnimationFrame> | null>(
    null
  );
  const prevTime = useRef(0);
  const { colorMode } = useColorMode();
  const bgColor = colorMode === "dark" ? "#0C0C0D" : "#EEE";
  const lineColor = colorMode === "dark" ? "#2E2E32" : "#2E2E32";
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fpsRef = useRef<HTMLSpanElement>(null);

  const drawLines = useCallback(() => {
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

    const gradient = ctx.createLinearGradient(0, 0, 0, canvasHeight); // Gradient from (0,0) to (200,0)
    gradient.addColorStop(0, lineColor); // Start color
    gradient.addColorStop(0.3, lineColor); // Middle color
    gradient.addColorStop(1, CLAWDIO_LINE); // End color

    ctx.beginPath();
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = gradient;

    let values = [];

    for (
      let lineIndex = 0;
      lineIndex < (canvasWidth * 1.5) / LINE_DIVISOR;
      lineIndex++
    ) {
      if (lineIndex == 0) {
        for (let i = 0; i < canvasHeight; i += 10) {
          const index =
            Math.floor(map(i, 0, canvasHeight, 0, data.current.length / 2)) * 2;
          const effectedValue = data.current[index + 1];
          const normalValue = data.current[index];
          const currentValue = lerp(
            normalValue,
            effectedValue,
            i / canvasHeight - 0.25
          );

          const y = i;
          // We scale the audio values to 0-1 to make it easier
          const amplitude = map(currentValue, -1, 1, 0, 1);
          const scaleAmplitude = 42;
          const scaledAmplitude = amplitude * scaleAmplitude;
          values.push([scaledAmplitude, y]);
        }
      }
      for (let i = 0; i < values.length; i++) {
        const [amplitude, y] = values[i];
        // Shifts to the left to fill in screen more (since we have double the lines we need anyway)
        const offset = canvasWidth / 2;
        // Distance between each line
        const lineOffset = lineIndex * LINE_DIVISOR;
        const x = amplitude / 2 + lineOffset - offset;
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
    }

    ctx.stroke();
  }, [colorMode]);

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

  const draw = (now: number) => {
    const elapsed = now - prevTime.current;
    const newFps = 1000 / elapsed;
    if (fpsRef.current && Math.floor(now % 8) == 0)
      fpsRef.current.textContent = Math.floor(newFps).toString();
    prevTime.current = now - (elapsed % newFps);
    // Generate more sine wave samples
    const newValue = Math.sin(now * 0.003);
    const noise = Math.random() * 2 - 1;
    // const effectValue = newValue * 10;
    const effectValue = Math.sin(now * 0.01) + noise * 2;
    data.current = [newValue, effectValue, ...data.current.slice(0, -2)];
    // setData((prevState) => [newValue, effectValue, ...prevState.slice(0, -1)]);

    drawLines();

    // Only keep animating if in view
    if (isInViewRef.current) animationRef.current = requestAnimationFrame(draw);
  };

  useEffect(() => {
    if (isInView) animationRef.current = requestAnimationFrame(draw);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [draw, isInView]);

  useEffect(() => {
    isInViewRef.current = isInView;
  }, [isInView]);

  return (
    <div ref={containerRef} className="WaterfallViz_Container">
      {/* <div
        style={{
          position: "fixed",
          top: 64,
          right: 16,
          background: "black",
          color: "white",
          zIndex:710
        }}
      >
        FPS: <span ref={fpsRef}></span>
      </div> */}
      <canvas
        className="WaterfallViz_Canvas"
        ref={canvasRef}
        width={"100%"}
        height={"100%"}
        style={{ flex: 1 }}
        {...props}
      />
      <div className="WaterfallViz_Gradient" />
    </div>
  );
};

export default WaterfallViz;
