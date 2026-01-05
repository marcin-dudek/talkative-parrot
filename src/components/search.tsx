import { ALargeSmall, BookA, Ruler } from "lucide-react";
import useSearchStore from "../state/search";
import worker from "./worker";
import { useResultsStore } from "../state/results";

const Search = () => {
  const { prefix, length, letters, setPrefix, setLength, setLetters } =
    useSearchStore();
  const { update } = useResultsStore();

  const inputStyle = (e: string | null) => {
    return `floating-label input mt-2 ${e ? "input-error" : ""}`;
  };

  const buttonStyle = () => {
    if (
      !prefix.error &&
      !length.error &&
      !letters.error &&
      prefix.value !== "" &&
      length.value !== null
    ) {
      return "btn btn-primary";
    } else {
      return "btn btn-primary btn-disabled";
    }
  };

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
    <div className="card bg-base-100 shadow-md w-96 card-border">
      <div className="card-body">
        <label className={inputStyle(prefix.error)}>
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
        <label className={inputStyle(length.error)}>
          <Ruler />
          <input
            type="number"
            className="grow"
            min={2}
            max={15}
            value={length?.value}
            onChange={(e) => setLength(e.target.value)}
          />
          <span>{length.error ? length.error : "Length"}</span>
        </label>
        <label className={inputStyle(letters.error)}>
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
          <button className={buttonStyle()} onClick={search}>
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default Search;
