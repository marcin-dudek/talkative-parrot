import { create } from "zustand";

interface ResultItem {
  word: string;
  score: number;
  definitions: string[] | null;
  isVisible: boolean;
}

interface Result {
  items: ResultItem[];
  error: string | null;
}

type ResultAction = {
  update: (items: ResultItem[], error: string | null) => void;
  updateDefinitions: (index: number, definitions: string[]) => void;
};

const useResultsStore = create<Result & ResultAction>((set) => ({
  items: [],
  error: null,
  update: (results: ResultItem[], error: string | null) =>
    set(() => ({ items: [...results], error: error })),
  updateDefinitions: (index: number, definitions: string[]) =>
    set((state) => {
      const items = [...state.items];
      items[index] = {
        ...items[index],
        definitions: definitions,
        isVisible: true,
      };
      return { items };
    }),
}));

export default useResultsStore;
