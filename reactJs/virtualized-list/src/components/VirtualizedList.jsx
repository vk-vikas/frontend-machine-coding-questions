import { useRef, useState, useEffect, useCallback } from "react";

const VirtualizedList = ({ itemCount, itemHeight, height, renderItem }) => {
  // height -> visible height of container in px
  const scrollRef = useRef(null);
  const [scrollTop, setScrollTop] = useState(0);

  const totalHeight = itemCount * itemHeight;
  const visibleCount = Math.ceil(height / itemHeight);
  const startIndex = Math.floor(scrollTop / itemHeight);
  const endIndex = Math.min(itemCount - 1, startIndex + visibleCount + 1);

  const handleScroll = useCallback((e) => {
    setScrollTop(e.target.scrollTop);
  }, []);

  useEffect(() => {
    const node = scrollRef.current;
    if (node) {
      node.addEventListener("scroll", handleScroll);
      return () => node.removeEventListener("scroll", handleScroll);
    }
  }, [handleScroll]);

  const items = [];
  for (let i = startIndex; i <= endIndex; i++) {
    items.push(
      <div
        key={i}
        style={{
          position: "absolute",
          top: `${i * itemHeight}px`,
          height: `${itemHeight}px`,
          width: "100%",
        }}
      >
        {renderItem(i, i)}
      </div>
    );
  }

  return (
    <div
      ref={scrollRef}
      style={{
        overflowY: "auto",
        height: `${height}px`,
        position: "relative",
        border: "1px solid #ccc",
      }}
    >
      <div style={{ height: `${totalHeight}px`, position: "relative" }}>
        {items}
      </div>
    </div>
  );
};

export default VirtualizedList;
