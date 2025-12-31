import { create } from "zustand";

const wordRegex = /^\p{L}+$/u;

type Value<T> = {
  value: T;
  error: string | null;
};

type Search = {
  prefix: Value<string>;
  length: Value<string>;
  letters: Value<string>;
};

type SearchAction = {
  setPrefix: (value: string) => void;
  setLength: (length: string) => void;
  setLetters: (value: string) => void;
};

const validateWord = (value: string) => {
  const valid = wordRegex.test(value);
  return valid
    ? { value: value, error: null }
    : { value: value, error: "Only letters are allowed." };
};

const useSearchStore = create<Search & SearchAction>((set) => ({
  prefix: { value: "", error: null },
  length: { value: "6", error: null },
  letters: { value: "", error: null },
  setPrefix: (value) => set(() => ({ prefix: validateWord(value) })),
  setLength: (length) =>
    set(() => ({ length: { value: length, error: null } })),
  setLetters: (value) => set(() => ({ letters: validateWord(value) })),
}));

export default useSearchStore;
