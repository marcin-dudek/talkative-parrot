import { BookPlus } from "lucide-react";
import useResultsStore from "../state/results";

const Words = () => {
  const { items, error, updateDefinitions } = useResultsStore();

  const wordDefinition = async (index: number, word: string) => {
    const response = await fetch(`/api/definition/${word}`);
    const data = await response.json();
    updateDefinitions(index, data.definitions);
  };

  return (
    <>
      <ul className="list rounded-box shadow-md w-96">
        {items.map((word, index) => (
          <li className="list-row" key={index}>
            <div className="w-[2em] font-thin opacity-30 tabular-nums">
              {index + 1}
            </div>
            <div className="list-col-grow">
              <div>{word.word}</div>
            </div>
            {word.definitions && (
              <ul className="list-col-wrap list-disc text-xs">
                {word.definitions.map((def, defIndex) => (
                  <li key={defIndex} className="text-xs">
                    {def}
                  </li>
                ))}
              </ul>
            )}
            {word.definitions ? (
              <p className="btn btn-xs btn-square btn-ghost btn-disabled">
                <BookPlus size={12} />
              </p>
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

        {!error && items.length === 0 && (
          <li className="list-row">
            <div className="list-col-grow">
              <div>No result</div>
            </div>
          </li>
        )}
      </ul>
    </>
  );
};

export default Words;
