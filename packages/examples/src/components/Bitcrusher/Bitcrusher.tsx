import { useCallback, useEffect, useRef } from "react";
import useAudioStore from "@/store/audio";
import { createBitcrusherNode } from "clawdio";
import type { BitcrusherNode } from "clawdio";

type Props = {
  bits?: number;
  normfreq?: number;
};

const Bitcrusher = ({ bits = 4, normfreq = 0.1 }: Props) => {
  const nodeRef = useRef<BitcrusherNode | null>(null);
  const { audioCtx, addAudioNode, removeAudioNode } = useAudioStore();

  const createNode = useCallback(async () => {
    nodeRef.current = await createBitcrusherNode(audioCtx, 4, 0.1);

    addAudioNode("bitcrusher", nodeRef.current.node);
  }, [addAudioNode, audioCtx]);

  useEffect(() => {
    if (!audioCtx || nodeRef.current) return;
    createNode();

    return () => {
      if (nodeRef.current) removeAudioNode("bitcrusher");
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

export default Bitcrusher;
