import { create } from "zustand";

interface ResultItem {
  word: string;
  score: number;
  definitions: string[] | null;
  isVisible: boolean;
}

interface Result {
  items: ResultItem[] | null;
  error: string | null;
}

type ResultAction = {
  update: (items: ResultItem[], error: string | null) => void;
  updateDefinitions: (index: number, definitions: string[]) => void;
  updateVisibility: (index: number, isVisible: boolean) => void;
};

const useResultsStore = create<Result & ResultAction>((set) => ({
  items: null,
  error: null,
  update: (results: ResultItem[], error: string | null) =>
    set(() => ({ items: [...results], error: error })),
  updateDefinitions: (index: number, definitions: string[]) =>
    set((state) => {
      const items = [...(state.items ?? [])];
      items[index] = {
        ...items[index],
        definitions: definitions,
        isVisible: true,
      };
      return { items };
    }),
  updateVisibility: (index: number, isVisible: boolean) =>
    set((state) => {
      const items = [...(state.items ?? [])];
      items[index] = {
        ...items[index],
        isVisible: isVisible,
      };
      return { items };
    }),
}));

export default useResultsStore;
