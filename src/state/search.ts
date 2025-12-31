import { create } from "zustand";

type Search = {
  prefix: string;
  length: string;
  letters: string;
};

type SearchAction = {
  setPrefix: (prefix: Search["prefix"]) => void;
  setLength: (length: Search["length"]) => void;
  setLetters: (prefix: Search["letters"]) => void;
};

const useSearchStore = create<Search & SearchAction>((set) => ({
  prefix: "",
  length: "6",
  letters: "",
  setPrefix: (prefix) => set(() => ({ prefix: prefix })),
  setLength: (length) => set(() => ({ length: length })),
  setLetters: (letters) => set(() => ({ letters: letters })),
}));

export default useSearchStore;
