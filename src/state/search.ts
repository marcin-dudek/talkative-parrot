import { create } from "zustand";

const wordRegex = /^\p{L}+$/u;
const lettersRegex = /^\p{L}*$/u;

type Value<T> = {
  value: T;
  error: string | null;
};

type Search = {
  prefix: Value<string>;
  length: Value<number>;
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

const validateLetters = (value: string) => {
  const valid = lettersRegex.test(value);
  return valid
    ? { value: value, error: null }
    : { value: value, error: "Only letters are allowed." };
};

const useSearchStore = create<Search & SearchAction>((set) => ({
  prefix: { value: "", error: null },
  length: { value: 6, error: null },
  letters: { value: "", error: null },
  setPrefix: (value) => set(() => ({ prefix: validateWord(value) })),
  setLength: (length) =>
    set(() => {
      const num = parseInt(length);
      if (isNaN(num) || num < 2 || num > 15) {
        return {
          length: { value: num, error: "Length must be between 2 and 15" },
        };
      }
      return {
        length: { value: num, error: null },
      };
    }),
  setLetters: (value) => set(() => ({ letters: validateLetters(value) })),
}));

export default useSearchStore;
