import * as React from "react";

const useDraggable = ({ totalBlocks }) => {
  const containerRef = React.useRef(null);

  const [coordinate, setCoordinate] = React.useState({
    blocks: new Array(totalBlocks).fill(1).map((_, index) => {
      return { x: 0, y: 0 }; // Initialize all blocks at (0, 0)
    }),
    pointer: { x: 0, y: 0 },
    movingBlockIndex: null
  });

  const calculateInitialBlockPositions = () => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.clientWidth;
      const blocksPerRow = Math.floor(containerWidth / 128); // Adjust block size as needed
      const blocks = coordinate.blocks.map((_, index) => {
        const col = index % blocksPerRow;
        const row = Math.floor(index / blocksPerRow);
        return { x: col * 128, y: row * 128 }; // Adjust block size as needed
      });
      setCoordinate((prev) => ({ ...prev, blocks }));
    }
  };
  

  React.useEffect(() => {
    calculateInitialBlockPositions();
    window.addEventListener("resize", calculateInitialBlockPositions);
    return () => {
      window.removeEventListener("resize", calculateInitialBlockPositions);
    };
  }, []);

  const handleMouseMove = React.useCallback((event) => {
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
  }, [coordinate.movingBlockIndex]);

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
    blocks: coordinate.blocks,
    containerRef
  };
};

export default useDraggable;
