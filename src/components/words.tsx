import { Info, ShieldAlert } from "lucide-react";
import { useResultsStore } from "../state/results";
import Word from "./word";

const Words = () => {
  const { words, error } = useResultsStore();

  return (
    <>
      {words && (
        <div className="card">
          <div className="card-body">
            {!error && words.length > 0 && (
              <table className="table">
                <thead>
                  <tr>
                    <th className="w-1/6">#</th>
                    <th>Words</th>
                    <th className="w-1/6">({words.length})</th>
                  </tr>
                </thead>
                <tbody>
                  {words.map((word, index) => (
                    <Word key={index} index={index} word={word} />
                  ))}
                  {words.length === 0 && (
                    <tr>
                      <td colSpan={3} className="text-center">
                        No result
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}

            {!error && words.length === 0 && (
              <div role="alert" className="alert alert-info alert-soft">
                <Info />
                <span>No results.</span>
              </div>
            )}

            {error && (
              <div role="alert" className="alert alert-error alert-soft">
                <ShieldAlert />
                <span>{error}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Words;
