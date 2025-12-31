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
    worker.postMessage({ prefix, length, letters });
  };

  return (
    <div className="card w-96 bg-base-100 card-md shadow-sm">
      <div className="card-body">
        <label className="input">
          <BookA />
          <input
            type="text"
            className="grow"
            placeholder="prefix"
            onChange={(e) => setPrefix(e.target.value)}
            value={prefix}
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
  );
};

export default Search;
