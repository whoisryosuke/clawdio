import React, { ComponentType, JSX, ReactNode } from "react";
import { AudioNodeTypes, AudioNodeWrapper } from "./AudioGraph.types";
import OscillatorGraphNode from "./nodes/OscillatorGraphNode";
import clsx from "clsx";

const AUDIO_NODES_COMPONENTS: Record<
  AudioNodeTypes,
  (props: any) => JSX.Element
> = {
  osc: OscillatorGraphNode,
  bitcrusher: OscillatorGraphNode,
};

type Props = {
  node: AudioNodeWrapper;
};

const AudioGraphNode = ({ node }: Props) => {
  console.log("rendering", node.type);
  const NodeComponent = AUDIO_NODES_COMPONENTS[node.type];

  return (
    <div
      className={clsx("AudioGraphNode", node.type == "bitcrusher" && "clawdio")}
    >
      <NodeComponent node={node} />
    </div>
  );
};

export default AudioGraphNode;
