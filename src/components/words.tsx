import { useResultsStore } from "../state/results";
import Word from "./word";

const Words = () => {
  const { words, error } = useResultsStore();

  return (
    <>
      {words && (
        <div className="card bg-base-100 card-md shadow-sm h-full max-h-1/3">
          <div className="card-body">
            <h2 className="card-title">Results ({words.length}):</h2>
            <ul className="list">
              {words.map((word, index) => (
                <Word key={index} index={index} word={word} />
              ))}

              {error && (
                <li className="list-row">
                  <div className="list-col-grow">
                    <div className="text-error">{error}</div>
                  </div>
                </li>
              )}

              {!error && words.length === 0 && (
                <li className="list-row">
                  <div className="list-col-grow">
                    <div>No result</div>
                  </div>
                </li>
              )}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default Words;
