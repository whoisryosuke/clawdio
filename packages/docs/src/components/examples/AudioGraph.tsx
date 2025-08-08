import useAudioStore from "@site/src/store/audio";
import { createBitcrusherNode } from "clawdio";
import React, { useEffect, useRef, useState } from "react";
import { AudioNodeConfig, AudioNodeWrapper } from "./AudioGraph.types";
import AudioGraphNode from "./AudioGraphNode";
import "./AudioGraph.css";
import clsx from "clsx";
import Button from "../ui/Button/Button";
import Stack from "../ui/Stack/Stack";
import { BiRightArrowAlt } from "react-icons/bi";

type Props = {
  graph: AudioNodeConfig[];
  connectOutput?: boolean;
};

const AudioGraph = ({ graph, connectOutput }: Props) => {
  const { context, setContext } = useAudioStore();
  const [audioNodes, setAudioNodes] = useState<AudioNodeWrapper[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!context) {
      const audioCtx = new AudioContext();
      // audioCtx.onstatechange = (event) => {
      //   console.log(
      //     "state change",
      //     (event.currentTarget as AudioContext).state
      //   );
      //   setLoaded((event.currentTarget as AudioContext).state != "suspended");
      // };

      console.log("state", audioCtx.state);

      setContext(audioCtx);
      return;
    }

    let newNodes: AudioNodeWrapper[] = [];
    graph.forEach(async (node, index) => {
      const analyser = context.createAnalyser();
      switch (node.type) {
        case "osc":
          const osc = context.createOscillator();
          osc.start();
          osc.connect(analyser);
          newNodes.push({ type: node.type, node: osc, analyser });
          break;
        case "bitcrusher":
          const bitcrusher = await createBitcrusherNode(context, 4, 0.1);
          bitcrusher.node.connect(analyser);
          newNodes.push({ type: node.type, ...bitcrusher, analyser });
          break;
      }
      if (index > 0) {
        // Connect previous node to this node
        newNodes[index - 1].node.connect(newNodes[index].node);
      }
      if (connectOutput && index == newNodes.length - 1) {
        // Connect nodes to output
        newNodes[index].node.connect(context.destination);
      }
    });
    setAudioNodes(newNodes);

    return () => {
      audioNodes.forEach((node) => {
        node.node.disconnect();
      });
      setAudioNodes([]);
    };
  }, [context]);

  const handleStart = () => {
    if (context.state == "suspended") {
      context.resume();
    }
    setLoaded(true);
  };

  console.log("audioNodes", audioNodes);

  return (
    <div className="AudioGraph">
      <Stack
        horizontal
        responsive
        style={{ alignItems: "center" }}
        className={clsx("nodes", loaded && "visible")}
      >
        {audioNodes.map((node, index) => (
          <>
            <AudioGraphNode node={node} />
            {index != audioNodes.length - 1 && (
              <BiRightArrowAlt
                className="arrow"
                size={64}
                color="var(--gray-6)"
              />
            )}
          </>
        ))}
      </Stack>
      <div className={clsx("overlay", loaded && "hidden")}>
        <Button secondary onClick={handleStart}>
          Start Visualization
        </Button>
      </div>
    </div>
  );
};

export default AudioGraph;
