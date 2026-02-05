import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface ResultItem {
  word: string;
  score: number;
  definitions: string[] | null;
  isVisible: boolean;
}

interface Result {
  words: ResultItem[] | null;
  error: string | null;
}

type ResultAction = {
  update: (items: ResultItem[], error: string | null) => void;
  updateDefinitions: (index: number, definitions: string[]) => void;
  updateVisibility: (index: number, isVisible: boolean) => void;
};

const useResultsStore = create<Result & ResultAction>()(
  immer((set) => ({
    words: null,
    error: null,
    update: (results: ResultItem[], error: string | null) =>
      set(() => ({ words: [...results], error: error })),
    updateDefinitions: (index: number, definitions: string[]) =>
      set((state) => {
        if (state.words) {
          state.words[index].definitions = definitions;
          state.words[index].isVisible = true;
        }
      }),
    updateVisibility: (index: number, isVisible: boolean) =>
      set((state) => {
        if (state.words) {
          state.words[index].isVisible = isVisible;
        }
      }),
  })),
);

export { useResultsStore, type ResultItem };
