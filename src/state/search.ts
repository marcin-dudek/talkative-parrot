import { create } from "zustand";

const prefixRegex = /^[a-z.]*$/;
const lettersRegex = /^[a-z]*$/;

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

const validatePrefix = (length: number, value: string) => {
  if (value.replaceAll(".", "").length === 0) {
    return { value: value, error: "Prefix must have letter." };
  }

  if (value.length > length) {
    return {
      value: value,
      error: "Prefix cannot be longer than chosen length.",
    };
  }

  const valid = prefixRegex.test(value);

  return valid
    ? { value: value, error: null }
    : { value: value, error: "Only letters are allowed and dot." };
};

const validateLength = (prefix: Value<string>, length: string) => {
  const num = parseInt(length);
  if (isNaN(num) || num < 2 || num > 15) {
    return { value: num, error: "Length must be between 2 and 15" };
  }

  if (prefix.value.length > num) {
    return {
      value: num,
      error: "Prefix cannot be longer than chosen length.",
    };
  }

  return {
    value: num,
    error: null,
  };
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
  setPrefix: (value) => {
    const sanitized = value.toLowerCase().replace(/[^a-z.]/g, "");
    set((state) => ({ prefix: validatePrefix(state.length.value, sanitized) }));
  },
  setLength: (length) =>
    set((state) => ({ length: validateLength(state.prefix, length) })),
  setLetters: (value) => {
    const sanitized = value.toLowerCase().replace(/[^a-z]/g, "");
    set(() => ({ letters: validateLetters(sanitized) }));
  },
}));

export default useSearchStore;
