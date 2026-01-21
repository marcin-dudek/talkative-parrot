import { Info, ShieldAlert } from "lucide-react";
import { useResultsStore } from "../state/results";
import Word from "./Word";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useRef } from "react";

const Words = () => {
  const { words, error } = useResultsStore();
  const parentRef = useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: words?.length ?? 0,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 50,
    overscan: 10,
  });

  return (
    <>
      {words && (
        <div className="card">
          <div
            className="card-body w-96"
            ref={parentRef}
            style={{
              height: `500px`,
              overflowY: "scroll",
            }}
          >
            {!error && words.length > 0 && (
              <div
                className="grid grid-cols-12 gap-2"
                style={{
                  height: `${rowVirtualizer.getTotalSize()}px`,
                  position: "relative",
                }}
              >
                <div className="col-span-1 font-bold text-center">#</div>
                <div className="col-span-9 font-bold">Words</div>
                <div className="col-span-2 font-bold text-center">
                  ({words.length})
                </div>
                <div className="col-span-12">
                  <hr className="border-base-content/10" />
                </div>

                {rowVirtualizer.getVirtualItems().map((virtualRow) => (
                  <Word
                    key={virtualRow.index}
                    index={virtualRow.index}
                    word={words[virtualRow.index]}
                    start={virtualRow.start + 50}
                  />
                ))}
                {words.length === 0 && (
                  <div className="col-span-12 text-center">No result</div>
                )}
              </div>
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

//Words.whyDidYouRender = true;
export default Words;
