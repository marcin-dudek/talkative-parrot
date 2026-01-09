import { Moon, Sun } from "lucide-react";
import useThemeStore from "../state/theme";

const NavigationMenu = () => {
  const { dark, setDark } = useThemeStore();

  return (
    <div className="navbar rounded-box" role="navigation">
      <div className="navbar-start">
        <a className="btn btn-ghost text-xl" href="/">
          Word Search
        </a>
      </div>
      <div className="navbar-end">
        <label className="flex cursor-pointer gap-2">
          <Sun />
          <input
            type="checkbox"
            value="dark"
            className="toggle theme-controller"
            checked={dark}
            onChange={() => {
              setDark(!dark);
              localStorage.setItem("isDark", (!dark).toString());
            }}
            aria-label="Theme switcher, dark mode and light mode."
          />
          <Moon />
        </label>
      </div>
    </div>
  );
};

export default NavigationMenu;
