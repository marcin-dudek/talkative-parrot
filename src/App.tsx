import "./App.css";
import NavigationMenu from "./components/NavigationMenu";
import Search from "./components/Search";
import Words from "./components/Words";

const App = () => {
  return (
    <div className="flex flex-col max-h-screen max-md:w-full md:max-w-7xl p-4 mx-auto items-center">
      <NavigationMenu />
      <div role="main">
        <Search />
        <p className="pt-6" />
        <div className="overflow-auto w-96">
          <Words />
        </div>
      </div>
    </div>
  );
};

export default App;
