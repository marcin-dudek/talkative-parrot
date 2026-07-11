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
  setDark: (dark) =>
    set(() => {
      localStorage.setItem("isDark", dark.toString());
      document.documentElement.setAttribute("data-theme", dark ? "dark" : "light"); 
      return { dark: dark };
    }),
}));

export default useThemeStore;
