export const AUDIO_NODE_TITLES = {
  osc: "Oscillator",
  bitcrusher: "Bitcrusher",
};

export type AudioNodeTypes = keyof typeof AUDIO_NODE_TITLES;
export const CLAWDIO_NODES_KEYS = ["bitcrusher"];
export type ClawdioNodes = Extract<AudioNodeTypes, "bitcrusher">;

export type AudioNodeConfig = {
  type: AudioNodeTypes;

  // TODO: props / data
};

export type AudioNodeWrapper = {
  type: AudioNodeTypes;
  node: AudioNode;
  analyser: AnalyserNode;
};

export const AUDIO_NODE_CODE: Record<AudioNodeTypes, string> = {
  bitcrusher: "createBitcrusherNode()",
  osc: "new OscillatorNode()",
};
