import { BookPlus, ChevronDown, ChevronUp } from "lucide-react";
import { useResultsStore, type ResultItem } from "../state/results";
import { memo } from "react";

const Word = memo(({ index, word }: { index: number; word: ResultItem }) => {
  const updateDefinitions = useResultsStore((state) => state.updateDefinitions);
  const updateVisibility = useResultsStore((state) => state.updateVisibility);

  const wordDefinition = async (index: number, word: string) => {
    const response = await fetch(`/api/definition/${word}`);
    const data = await response.json();
    updateDefinitions(index, data.definitions);
  };

  const noBorderClass = (current: string) =>
    word.definitions && word.isVisible ? current + " border-b-0" : current;

  return (
    <>
      <tr className={noBorderClass("")}>
        <td className={noBorderClass("tabular-nums font-thin")}>{index + 1}</td>
        <td className={noBorderClass("")}>{word.word}</td>
        <td className={noBorderClass("")}>
          {word.definitions ? (
            <a
              className="btn btn-xs btn-square btn-ghost"
              onClick={() => updateVisibility(index, !word.isVisible)}
            >
              {word.isVisible ? (
                <ChevronUp size={12} />
              ) : (
                <ChevronDown size={12} />
              )}
            </a>
          ) : (
            <a
              className="btn btn-xs btn-square btn-ghost"
              onClick={() => wordDefinition(index, word.word)}
            >
              <BookPlus size={12} />
            </a>
          )}
        </td>
      </tr>

      {word.definitions && word.isVisible && (
        <tr className="border-t-0">
          <td className="border-t-0"></td>
          <td colSpan={2} className="border-t-0">
            <ul className="list-col-wrap list-disc text-xs">
              {word.definitions.map((def, defIndex) => (
                <li key={defIndex} className="text-xs">
                  {def}
                </li>
              ))}
            </ul>
          </td>
        </tr>
      )}
    </>
  );
});

export default Word;
