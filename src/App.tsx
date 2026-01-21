import "./App.css";
import NavigationMenu from "./components/NavigationMenu";
import RowVirtualizerFixed from "./components/RowVirt";
import Search from "./components/Search";
import Words from "./components/Words";

const App = () => {
  return (
    <div className="flex flex-col max-h-screen max-md:w-full md:max-w-7xl p-4 mx-auto items-center">
      <NavigationMenu />
      <div role="main">
        <Search />
        <p className="pt-6" />
        <Words />
        <RowVirtualizerFixed />
      </div>
    </div>
  );
};

App.whyDidYouRender = true;
export default App;
