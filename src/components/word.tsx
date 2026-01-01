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
    <li className="list-row">
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
  );
};

export default Word;
