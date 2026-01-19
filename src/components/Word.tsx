import { BookPlus, ChevronDown, ChevronUp } from "lucide-react";
import { useResultsStore, type ResultItem } from "../state/results";

const Word = ({ index, word }: { index: number; word: ResultItem }) => {
  const { updateDefinitions, updateVisibility } = useResultsStore();

  const wordDefinition = async (index: number, word: string) => {
    const response = await fetch(`/api/definition/${word}`);
    const data = await response.json();
    updateDefinitions(index, data.definitions);
  };

  return (
    <>
      <div className="tabular-nums font-thin col-span-1 text-center">
        {index + 1}
      </div>
      <div className="col-span-9">{word.word}</div>
      <div className="col-span-2 text-center">
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
    </>
  );
};

//Word.whyDidYouRender = true;
export default Word;
