export const AUDIO_NODE_TITLES = {
  osc: "Oscillator",
  bitcrusher: "Bitcrusher",
  moog: "Moog Filter",
  "pink-noise": "Pink Noise",
};

export type AudioNodeTypes = keyof typeof AUDIO_NODE_TITLES;
export const CLAWDIO_NODES_KEYS: Partial<AudioNodeTypes>[] = [
  "bitcrusher",
  "moog",
  "pink-noise",
];
export type ClawdioNodes = Extract<
  AudioNodeTypes,
  "bitcrusher" | "moog" | "pink-noise"
>;

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
  moog: "Moog Filter",
  "pink-noise": "Pink Noise",
};
