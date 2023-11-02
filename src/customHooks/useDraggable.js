import * as React from "react";

const useDraggable = ({ totalBlocks, blockInRow }) => {
  const [coordinate, setCoordinate] = React.useState({
    blocks: new Array(totalBlocks).fill(1).map((_, index) => {
      const col = Math.floor(index % blockInRow);
      const row = Math.floor(index / blockInRow);
      return { x: col * 120 + col * 8, y: 120 * row + row * 8 };
    }),
    pointer: { x: 0, y: 0 },
    movingBlockIndex: null
  });

  const handleMouseMove = React.useCallback(
    (event) => {
      if (coordinate.movingBlockIndex === null) {
        return;
      }
      const coordinates = { x: event.clientX, y: event.clientY };

      setCoordinate((prev) => {
        const diff = {
          x: coordinates.x - prev.pointer.x,
          y: coordinates.y - prev.pointer.y
        };
        return {
          ...prev,
          pointer: coordinates,
          blocks: prev.blocks.map((b, index) =>
            prev.movingBlockIndex === index
              ? { x: b.x + diff.x, y: b.y + diff.y }
              : b
          )
        };
      });
    },
    [coordinate.movingBlockIndex]
  );

  const handleMouseUp = React.useCallback(() => {
    setCoordinate((prev) => ({
      ...prev,
      movingBlockIndex: null
    }));
  }, []);

  const handleMouseDown = React.useCallback((event) => {
    const index = parseInt(event.target.getAttribute("data-index"), 10);
    const startingCoordinates = { x: event.clientX, y: event.clientY };
    setCoordinate((prev) => ({
      ...prev,
      pointer: startingCoordinates,
      movingBlockIndex: index
    }));
    event.stopPropagation();
  }, []);

  return {
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    blocks: coordinate.blocks
  };
};

export default useDraggable;
