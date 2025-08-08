import useAudioStore from "@site/src/store/audio";
import React, { useEffect } from "react";
import { AudioNodeWrapper } from "../AudioGraph.types";
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
        Audio Node
      </Heading>
      <Heading as="h2" className="title">
        {node.type}
      </Heading>
      <Waveform
        analyser={node.analyser}
        fps={3}
        color={node.type == "bitcrusher" ? "clawdio" : "blue"}
      />
      {node.type == "bitcrusher" && (
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
