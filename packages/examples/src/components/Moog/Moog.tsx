import { useCallback, useEffect, useRef } from "react";
import useAudioStore from "@/store/audio";
import { createMoogNode } from "clawdio";
import type { MoogNode } from "clawdio";

type Props = {
  bits?: number;
  normfreq?: number;
};

const Moog = ({ bits = 4, normfreq = 0.1 }: Props) => {
  const nodeRef = useRef<MoogNode | null>(null);
  const { audioCtx, addAudioNode, removeAudioNode } = useAudioStore();

  const createNode = useCallback(async () => {
    nodeRef.current = await createMoogNode(audioCtx, 4, 0.1);

    addAudioNode("moog", nodeRef.current.node);
  }, [addAudioNode, audioCtx]);

  useEffect(() => {
    if (!audioCtx || nodeRef.current) return;
    createNode();

    return () => {
      if (nodeRef.current) removeAudioNode("moog");
      nodeRef.current?.node.disconnect();
    };
  }, [audioCtx, createNode, removeAudioNode]);

  useEffect(() => {
    nodeRef.current?.setBits(bits);
  }, [bits]);

  useEffect(() => {
    nodeRef.current?.setNormfreq(normfreq);
  }, [normfreq]);

  return <></>;
};

export default Moog;
