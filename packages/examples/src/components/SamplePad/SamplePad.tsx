import { useEffect, useRef, useState, type PropsWithChildren } from "react";
import useAudioStore from "../../store/audio";
import { scheduleADSR } from "@/utils/audio";
import { Button, Stack } from "@whoisryosuke/oat-milk-design";
import Waveform from "../Waveform/Waveform";
import StaticWaveform from "../Waveform/StaticWaveform";

const PIANO_KEYS = [
  "C",
  "C#",
  "D",
  "D#",
  "E",
  "F",
  "F#",
  "G",
  "G#",
  "A",
  "A#",
  "B",
];
const BASE_OCTAVE = 4;
const OCTAVES = [3, 4, 5];
const OCTAVE_RATES = [0.5, 1.0, 2.0];

type Props = {
  file: string;
  waveform: boolean;
};

const SamplePad = ({ file, children, ...props }: PropsWithChildren<Props>) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [bufferLength, setBufferLength] = useState(0);
  const [audioBuffer, setAudioBuffer] = useState<AudioBuffer | null>(null);
  const audioCtx = useRef<AudioContext>(null);
  const { setAudioCtx, audioNodes } = useAudioStore();

  const handleDone = () => {
    setIsPlaying(false);
  };

  useEffect(() => {
    if (!audioCtx.current) {
      audioCtx.current = new window.AudioContext();
      setAudioCtx(audioCtx.current);
    }

    const loadSample = async () => {
      if (!audioCtx.current) return;

      // Load data into a generic buffer
      const response = await fetch(file);
      const arrayBuffer = await response.arrayBuffer();

      // Use context to decode into an audio buffer
      const newAudioBuffer = await audioCtx.current.decodeAudioData(
        arrayBuffer
      );

      setAudioBuffer(newAudioBuffer);
    };

    loadSample();
    console.log("audio created", audioCtx.current);

    // return () => {
    //   audioElement.current?.remove();
    //   audioCtx.current?.close();
    // };
  }, [file]);

  const handlePlay = (octaveIndex: number, pianoKeyIndex: number) => {
    if (!audioBuffer || !audioCtx.current) return;

    // Check if context is in suspended state (autoplay policy)
    if (audioCtx.current?.state === "suspended") {
      audioCtx.current.resume();
    }

    // if (!isPlaying) {
    console.log("playing");
    // Play audio

    // Create the buffer node and attach our audio buffer
    const sourceNode = audioCtx.current.createBufferSource();
    sourceNode.buffer = audioBuffer;
    const playbackRateBase = OCTAVE_RATES[octaveIndex];
    const playbackRateMax = playbackRateBase * 2;
    const playbackRatePitch =
      ((playbackRateMax - playbackRateBase) / PIANO_KEYS.length) *
      pianoKeyIndex;
    const playbackRate = playbackRateBase + playbackRatePitch;
    console.log(
      "playback rate",
      playbackRate,
      playbackRateBase,
      playbackRateMax
    );
    sourceNode.playbackRate.value = playbackRate;

    // Add any event listeners to audio (like when it's done)
    // sourceNode.addEventListener("ended", handleDone);

    console.log("all audio nodes to connect", audioNodes);

    // Loop through any dynamic audio nodes and attach them
    let prevNode: AudioNode = sourceNode;
    audioNodes.forEach((node, index) => {
      console.log("connecting node", node);
      // Handle custom nodes
      if ("setup" in node) {
        node.setup(prevNode);
        prevNode = node.output;
      } else {
        // Handle native AudioNode
        prevNode.connect(node);
        prevNode = node;
      }
    });
    prevNode.connect(audioCtx.current.destination);
    //   sourceNode.connect(audioCtx.current.destination);

    const now = audioCtx.current.currentTime;
    // Schedule ADSR
    const adsrConfig = {
      attack: 0.1,
      decay: 0.2,
      sustain: 0.7,
      release: 0.3,
      peak: 1.0,
    };
    // Get the gain node
    const gainNode = audioNodes.get("gain") as GainNode;
    if (gainNode) {
      // Schedule the ADSR press and release
      scheduleADSR(gainNode.gain, now, adsrConfig);
    }

    // Play audio
    sourceNode.start(now);

    //   setIsPlaying(true);
    // } else {
    //   console.log("pausing");
    //   // Play audio
    //   //   audioElement.current.pause();
    //   setIsPlaying(false);
    // }
  };

  return (
    <div>
      {/* <audio ref={audioElement} preload="auto" src={file} /> */}
      <Stack vertical gap="0.25rem">
        {children}
        <div style={{ display: "flex" }}>
          {audioBuffer && <StaticWaveform buffer={audioBuffer} />}
          <Waveform />
        </div>
        {/* <AudioTime audio={audioElement} /> */}
        {OCTAVES.map((octave, octaveIndex) => (
          <Stack>
            {PIANO_KEYS.map((pianoKey, index) => (
              <Button
                px={5}
                py={2}
                borderRadius={1}
                onClick={() => handlePlay(octaveIndex, index)}
                display="flex"
                justifyContent="center"
              >
                {pianoKey}
                {octave}
              </Button>
            ))}
          </Stack>
        ))}
      </Stack>
    </div>
  );
};

export default SamplePad;
