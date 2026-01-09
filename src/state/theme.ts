import { create } from "zustand";

const initialDark = () => {
  const storedDark = localStorage.getItem("isDark");
  if (storedDark !== null) {
    return storedDark === "true";
  }
  if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    return true;
  }

  return false;
};

type Theme = {
  dark: boolean;
};

type ThemeAction = {
  setDark: (dark: boolean) => void;
};

const useThemeStore = create<Theme & ThemeAction>((set) => ({
  dark: initialDark(),
  setDark: (dark) => set(() => ({ dark: dark })),
}));

export default useThemeStore;
