export type AudioWorkletEventMessage<T> = {
  type: string;
  data: T;
};

export interface BitcrusherEventInitWasm
  extends AudioWorkletEventMessage<ArrayBuffer> {
  type: "init-wasm";
  data: ArrayBuffer;
}

export interface BitcrusherEventInitModule
  extends AudioWorkletEventMessage<BitcrusherOptions> {
  type: "init-module";
  data: BitcrusherOptions;
}

export interface BitcrusherEventSetBits
  extends AudioWorkletEventMessage<number> {
  type: "set-bits";
  data: number;
}
export interface BitcrusherEventSetNormfreq
  extends AudioWorkletEventMessage<number> {
  type: "set-normfreq";
  data: number;
}

export type BitcrusherOptions = {
  bits: number;
};

export type AudioWorkletClientEvent<T> = {
  data: T;
};
