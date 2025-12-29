import { useState } from "react";
import { NavigationMenu } from "./components/navbar";
import { ALargeSmall, BookA, BookPlus, Ruler } from "lucide-react";
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
  const [wordDefinitions, setWordDefinitions] = useState<(string[]|null)[]>([]);

  const search = async () => {
    worker.onmessage = async (event) => {
      if (event.data.error) {
        setError(event.data.error);
        setResults([]);
        return;
      }
      const data = event.data as { results: SearchItem[] };
      setResults(data.results);
      setWordDefinitions(Array.from({length: data.results.length}, () => null));
      setError(null);
    };
    worker.postMessage({ word, length, letters });
  };

  const wordDefinition= async (index: number, word: string) => {
    const response = await fetch(`/api/${word}`);
    const data = await response.json();
    console.log(data);
    const newDefinitions = [...wordDefinitions];
    newDefinitions[index] = data.definitions;
    setWordDefinitions(newDefinitions);
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
        <br/>
        <ul className="list rounded-box shadow-md w-96"> 
          {results.map((x, index) => (
            <li className="list-row" key={index}>
              <div className="w-[2em] font-thin opacity-30 tabular-nums">{index +1}</div>
              <div className="list-col-grow">
                
                <div>{x.item}</div>
              </div>
              {wordDefinitions[index] && (
                <ul className="list-col-wrap list-disc text-xs">
                  {wordDefinitions[index]?.map((def, defIndex) => (
                    <li key={defIndex} className="text-sm">{def}</li>
                  ))}
                </ul>
              )}
              {
                  wordDefinitions[index] ? 
                  <p className="btn btn-xs btn-square btn-ghost btn-disabled">
                    <BookPlus size={12} />
                  </p>
                  : 
                  <a className="btn btn-xs btn-square btn-ghost" onClick={() => wordDefinition(index,x.item)}>
                    <BookPlus size={12} />
                  </a>
                }
            </li>
          ))}
          {error && (
            <li className="list-row">
              <div className="list-col-grow">
                <div className="text-error">{error}</div>
              </div>
            </li>
          )}

          {!error && results.length === 0 && (
            <li className="list-row">
              <div className="list-col-grow">
                <div>No result</div>
              </div>
            </li>
          )}
        </ul>
      </div>
    </>
  );
};

export default App;
