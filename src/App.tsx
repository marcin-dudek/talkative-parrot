import "./App.css";
import NavigationMenu from "./components/navbar";
import Search from "./components/search";
import Words from "./components/words";

const App = () => {
  return (
    <div className="flex flex-col min-h-screen max-md:w-full md:max-w-7xl p-4 mx-auto items-center">
      <NavigationMenu />
      <Search />
      <p className="pt-6" />
      <Words />
    </div>
  );
};

export default App;
