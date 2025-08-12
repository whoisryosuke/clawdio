import useAudioStore from "@site/src/store/audio";
import React, { useEffect } from "react";
import {
  AUDIO_NODE_TITLES,
  AudioNodeWrapper,
  CLAWDIO_NODES_KEYS,
} from "../AudioGraph.types";
import Waveform from "./Waveform";
import Heading from "../../ui/Heading/Heading";
import ClawdioLogoBug from "../../ClawdioLogo/ClawdioLogoBug";

type Props = {
  node: AudioNodeWrapper;
};

const OscillatorGraphNode = ({ node }: Props) => {
  return (
    <div>
      <Heading as="h4" className="subtitle">
        {CLAWDIO_NODES_KEYS.includes(node.type)
          ? "Audio Worklet"
          : "Audio Node"}
      </Heading>
      <Heading as="h2" className="title">
        {AUDIO_NODE_TITLES[node.type]}
      </Heading>
      <Waveform
        analyser={node.analyser}
        fps={3}
        color={CLAWDIO_NODES_KEYS.includes(node.type) ? "clawdio" : "#2F4EB2"}
      />
      {CLAWDIO_NODES_KEYS.includes(node.type) && (
        <ClawdioLogoBug
          color="var(--clawdio-1000-brand)"
          width="36px"
          height="36px"
        />
      )}
    </div>
  );
};

export default OscillatorGraphNode;
