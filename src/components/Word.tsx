import { memo } from "react";
import { BookPlus, ChevronDown, ChevronUp } from "lucide-react";
import { useResultsStore, type ResultItem } from "../state/results";

const Word = memo(
  ({
    index,
    word,
    start,
  }: {
    index: number;
    word: ResultItem;
    start: number;
  }) => {
    const updateDefinitions = useResultsStore(
      (state) => state.updateDefinitions,
    );
    const updateVisibility = useResultsStore((state) => state.updateVisibility);

    const wordDefinition = async (index: number, word: string) => {
      const response = await fetch(`/api/definition/${word}`);
      const data = await response.json();
      updateDefinitions(index, data.definitions);
    };

    return (
      <div
        className="grid grid-cols-12"
        style={{ position: "absolute", transform: `translateY(${start}px)` }}
      >
        <div className="tabular-nums font-thin col-span-1 text-center">
          {index + 1}
        </div>
        <div className="col-span-9">{word.word}</div>
        <div className="col-span-2 text-center">
          {word.definitions ? (
            <button
              className="btn btn-xs btn-square btn-ghost"
              onClick={() => updateVisibility(index, !word.isVisible)}
            >
              {word.isVisible ? (
                <ChevronUp size={12} />
              ) : (
                <ChevronDown size={12} />
              )}
            </button>
          ) : (
            <button
              className="btn btn-xs btn-square btn-ghost"
              onClick={() => wordDefinition(index, word.word)}
            >
              <BookPlus size={12} />
            </button>
          )}
        </div>

        {word.definitions && word.isVisible && (
          <>
            <div className="col-span-1"></div>
            <div className="col-span-11">
              <ul className="list-col-wrap list-disc text-xs">
                {word.definitions.map((def, defIndex) => (
                  <li key={defIndex} className="text-xs">
                    {def}
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}

        <div className="col-span-12">
          <hr className="border-base-content/10" />
        </div>
      </div>
    );
  },
);

export default Word;
