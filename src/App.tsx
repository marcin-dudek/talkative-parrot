import { useState } from "react";
import { NavigationMenu } from "./components/navbar";
import { ALargeSmall, BookA, Ruler } from "lucide-react";
import "./App.css";
import worker from "./components/worker";

interface SearchItem {
  item: string;
  score: number;
}

const App = () => {
  const [results, setResults] = useState<SearchItem[]>([]);
  const [length, setLength] = useState("6");
  const [letters, setLetters] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [word, setWord] = useState("");

  const search = async () => {
    worker.onmessage = async (event) => {
      if (event.data.error) {
        setError(event.data.error);
        setResults([]);
        return;
      }
      const data = event.data as { results: SearchItem[] };
      setResults(data.results);
      setError(null);
    };
    worker.postMessage({ word, length, letters });
  };

  return (
    <>
      <div className="flex flex-col min-h-screen max-md:w-full md:max-w-7xl p-4 mx-auto items-center">
        <NavigationMenu />
        <br />
        <div className="card w-96 bg-base-100 card-md shadow-sm">
          <div className="card-body">
            <label className="input">
              <BookA />
              <input
                type="text"
                className="grow"
                placeholder="prefix"
                onChange={(e) => setWord(e.target.value)}
              />
            </label>
            <label className="input">
              <Ruler />
              <input
                type="number"
                className="grow"
                placeholder=""
                value={length}
                onChange={(e) => setLength(e.target.value)}
              />
            </label>
            <label className="input">
              <ALargeSmall />
              <input
                type="text"
                className="grow"
                placeholder="letters"
                value={letters}
                onChange={(e) => setLetters(e.target.value)}
              />
            </label>
            <div className="justify-end card-actions">
              <button className="btn btn-primary" onClick={search}>
                Search
              </button>
            </div>
          </div>
        </div>
        <br />
        <div className="card">
          <div className="overflow-x-auto">
            <table className="table table-xs">
              <thead>
                <tr>
                  <th colSpan={2}>Search Results ({results.length}):</th>
                </tr>
              </thead>
              <tbody>
                {error && (
                  <tr>
                    <td className="text-error" colSpan={2}>{error}</td>
                  </tr>
                )}
                {results.map((x, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{x.item}</td>
                  </tr>
                ))}
                {!error && results.length === 0 && (
                  <tr>
                    <td colSpan={2}>No results</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
