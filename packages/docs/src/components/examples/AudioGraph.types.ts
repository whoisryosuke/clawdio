export type AudioNodeTypes = "osc" | "bitcrusher";

export type AudioNodeConfig = {
  type: AudioNodeTypes;

  // TODO: props / data
};

export type AudioNodeWrapper = {
  type: AudioNodeTypes;
  node: AudioNode;
  analyser: AnalyserNode;
};
