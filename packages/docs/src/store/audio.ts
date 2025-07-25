import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export interface AudioState {
  context: AudioContext | null;
  setContext: (context: AudioContext) => void;

  nodes: Map<string, AudioNode>;
  addNode: (key: string, node: AudioNode) => void;

  chain: string[];
  setChain: (chain: string[]) => void;
}

export const useAudioStore = create<AudioState>()(
  devtools(
    // Optional persist
    // This saves Zustand state when you close browser
    // Good in some cases, but not in others, especially prototyping
    // persist(

    (set) => ({
      context: null,
      setContext: (context) =>
        set(() => ({
          context,
        })),

      nodes: new Map(),
      addNode: (key, node) =>
        set((state) => ({
          nodes: new Map(state.nodes).set(key, node),
        })),

      chain: [],
      setChain: (chain) =>
        set(() => ({
          chain,
        })),
    })

    // END: Optional persist
    // )
  )
);

export default useAudioStore;
