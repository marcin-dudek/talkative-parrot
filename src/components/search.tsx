import { ALargeSmall, BookA, Ruler } from "lucide-react";
import useSearchStore from "../state/search";
import worker from "./worker";
import useResultsStore from "../state/results";

const Search = () => {
  const { prefix, length, letters, setPrefix, setLength, setLetters } =
    useSearchStore();
  const { update } = useResultsStore();

  const search = async () => {
    worker.onmessage = async (event) => {
      if (event.data.error) {
        update([], event.data.error);
        return;
      }
      update(event.data.results, null);
    };
    worker.postMessage({
      prefix: prefix.value,
      length: length.value,
      letters: letters.value,
    });
  };

  return (
    <div className="card w-96 bg-base-100 card-md shadow-sm">
      <div className="card-body">
        <label
          className={`floating-label input ${
            prefix.error ? "input-error" : ""
          }`}
        >
          <BookA />
          <input
            type="text"
            className="grow"
            placeholder="Prefix"
            onChange={(e) => setPrefix(e.target.value)}
            value={prefix?.value}
          />
          <span>{prefix.error ? prefix.error : "Prefix"}</span>
        </label>
        <label className="floating-label input">
          <Ruler />
          <input
            type="number"
            className="grow"
            min={3}
            max={16}
            value={length?.value}
            onChange={(e) => setLength(e.target.value)}
          />
          <span>Length</span>
        </label>
        <label className="floating-label input">
          <ALargeSmall />
          <input
            type="text"
            className="grow"
            placeholder="Letters"
            value={letters?.value}
            onChange={(e) => setLetters(e.target.value)}
          />
          <span>{letters.error ? letters.error : "Letters"}</span>
        </label>
        <div className="justify-end card-actions">
          <button className="btn btn-primary" onClick={search}>
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default Search;
