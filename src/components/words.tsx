import { BookPlus, ChevronDown, ChevronUp } from "lucide-react";
import useResultsStore from "../state/results";

const Words = () => {
  const { items, error, updateDefinitions, updateVisibility } =
    useResultsStore();

  const wordDefinition = async (index: number, word: string) => {
    const response = await fetch(`/api/definition/${word}`);
    const data = await response.json();
    updateDefinitions(index, data.definitions);
  };

  return (
    <>
      {items && (
        <div className="card w-96 bg-base-100 card-md shadow-sm">
          <div className="card-body">
            <h2 className="card-title">Results ({items.length})</h2>
            <ul className="list">
              {items?.map((word, index) => (
                <li className="list-row" key={index}>
                  <div className="w-[2em] font-thin opacity-30 tabular-nums">
                    {index + 1}
                  </div>
                  <div className="list-col-grow">
                    <div>{word.word}</div>
                  </div>
                  {word.definitions && word.isVisible && (
                    <ul className="list-col-wrap list-disc text-xs">
                      {word.definitions.map((def, defIndex) => (
                        <li key={defIndex} className="text-xs">
                          {def}
                        </li>
                      ))}
                    </ul>
                  )}
                  {word.definitions ? (
                    word.isVisible ? (
                      <a
                        className="btn btn-xs btn-square btn-ghost"
                        onClick={() => updateVisibility(index, false)}
                      >
                        <ChevronUp size={12} />
                      </a>
                    ) : (
                      <a
                        className="btn btn-xs btn-square btn-ghost"
                        onClick={() => updateVisibility(index, true)}
                      >
                        <ChevronDown size={12} />
                      </a>
                    )
                  ) : (
                    <a
                      className="btn btn-xs btn-square btn-ghost"
                      onClick={() => wordDefinition(index, word.word)}
                    >
                      <BookPlus size={12} />
                    </a>
                  )}
                </li>
              ))}
              {error && (
                <li className="list-row">
                  <div className="list-col-grow">
                    <div className="text-error">{error}</div>
                  </div>
                </li>
              )}

              {!error && items && items.length === 0 && (
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
