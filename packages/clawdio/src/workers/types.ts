export type AudioWorkletEventMessage<T> = {
  type: string;
  data: T;
};

export type AudioWorkletClientEvent<T> = {
  data: T;
};

export interface AudioWorkletInitWasmEvent
  extends AudioWorkletEventMessage<ArrayBuffer> {
  type: "init-wasm";
  data: ArrayBuffer;
}
