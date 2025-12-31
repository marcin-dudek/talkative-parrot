import { create } from "zustand";

const initialDark = () => {
  const storedDark = localStorage.getItem("isDark");
  if (storedDark !== null) {
    console.log("Theme - Stored dark mode:", storedDark);
    return storedDark === "true";
  }
  if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    console.log("Theme - Media: prefers dark");
    return true;
  } else {
    console.log("Theme - Media prefers light");
    return false;
  }
};

type Theme = {
  dark: boolean;
};

type ThemeAction = {
  setDark: (dark: Theme["dark"]) => void;
};

const useThemeStore = create<Theme & ThemeAction>((set) => ({
  dark: initialDark(),
  setDark: (dark) => set(() => ({ dark: dark })),
}));

export default useThemeStore;
