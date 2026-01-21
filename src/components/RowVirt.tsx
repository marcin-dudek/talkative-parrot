import { useVirtualizer } from "@tanstack/react-virtual";
import { useRef } from "react";

const RowVirtualizerFixed = () => {
  const parentRef = useRef(null);

  const rowVirtualizer = useVirtualizer({
    count: 10000,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 35,
  });

  return (
    <>
      <div
        ref={parentRef}
        className="w-96"
        style={{
          height: `500px`,
          overflow: "auto",
        }}
      >
        <div
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
            width: "100%",
            position: "relative",
          }}
        >
          {rowVirtualizer.getVirtualItems().map((virtualRow) => (
            <div
              key={virtualRow.index}
              className={
                virtualRow.index % 2 ? "bg-pink-400 w-96" : "bg-pink-800 w-96"
              }
              style={{
                position: "absolute",
                transform: `translateY(${virtualRow.start}px)`,
              }}
            >
              Row {virtualRow.index + 1}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default RowVirtualizerFixed;
