import * as React from "react";
import "../styles.css";
import useDraggable from "../customHooks/useDraggable";
import Block from "./Block";

const Grid = () => {
  const {
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    blocks
  } = useDraggable({ totalBlocks: 20, blockInRow: 6 });

  // const [blocks, setBlocks] = React.useState(
  //   new Array(10).fill(1).map(() => ({ x: 0, y: 0 }))
  // );

  return (
    <div
      className="block-container"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {blocks.map((coordinate, index) => (
        <Block
          key={index}
          label={index}
          style={{
            transform: `translate3d(${coordinate.x}px, ${coordinate.y}px, 0px)`
          }}
          data-index={index}
          onMouseDown={handleMouseDown}
        />
      ))}
    </div>
  );
};

export default Grid;
