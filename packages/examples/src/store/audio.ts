import { create } from "zustand";
import { devtools } from "zustand/middleware";

// type CustomNode = EchoNode;
// type AudioNodes = AudioNode | AudioWorkletNode | CustomNode;
type AudioNodes = AudioNode | AudioWorkletNode;

export interface AudioState {
  audioCtx: AudioContext;
  setAudioCtx: (audioCtx: AudioContext) => void;

  audioNodes: Map<string, AudioNodes>;
  addAudioNode: (key: string, audioNode: AudioNodes) => void;
  removeAudioNode: (key: string) => void;

  // Audio configuration
}

export const useAudioStore = create<AudioState>()(
  devtools((set) => ({
    audioCtx: null,
    setAudioCtx: (audioCtx) =>
      set((state) => ({
        ...state,
        audioCtx,
      })),

    audioNodes: new Map([]),
    addAudioNode: (key, audioNode) =>
      set((state) => ({
        ...state,
        audioNodes: state.audioNodes.set(key, audioNode),
      })),
    removeAudioNode: (key) =>
      set((state) => {
        state.audioNodes.delete(key);
        return {
          ...state,
          audioNodes: state.audioNodes,
        };
      }),

    // Config
  }))
);

export default useAudioStore;
