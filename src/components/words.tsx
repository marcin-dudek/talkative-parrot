import { BookPlus } from "lucide-react";
import { useResultsStore } from "../state/results";
import Word from "./word";
import Row from "./row";

const Words = () => {
  const { words, error } = useResultsStore();

  return (
    <>
      {words && (
        <div className="card">
          <div className="card-body">
            <h2 className="card-title">Results ({words.length}):</h2>
            <ul className="list">
              {words.map((word, index) => (
                <Word key={index} index={index} word={word} />
              ))}

              <table className="table">
                <thead>
                  <tr>
                    <th className="w-1/6">#</th>
                    <th>Word</th>
                    <th className="w-1/6"></th>
                  </tr>
                </thead>
                <tbody>
                  {words.map((word, index) => (
                    <Row key={index} index={index} word={word} />
                  ))}
                </tbody>
              </table>

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
