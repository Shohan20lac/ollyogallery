import * as React from "react";
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

import "../styles.css";
import "../output.css";

import "../utils/items"

import * as LR from "@uploadcare/blocks";
import FileUploader from "../../src/FileUploader/FileUploader";

import initialItems from "../utils/items";

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  // styles when dragging
  ...draggableStyle,
  width: '100px',
  height: '100px'
});

const getListStyle = isDraggingOver => ({
  // styles for the list
  display: 'flex',
  flexWrap: 'wrap', // This wraps items to the next line.
  padding: grid,
  backgroundColor: isDraggingOver ? 'lightblue' : 'lightgrey',
});


const Grid = ({ onDragEnd }) => {

  const [items, setItems] = React.useState (initialItems)

  const [photos, setPhotos] = React.useState([]);

  const handleDragEnd = (result) => {
    if (!result.destination) {
      return; // Item dropped outside the list
    }
  
    const reorderedItems = [...items]; // Copy your current items
    const [reorderedItem] = reorderedItems.splice(result.source.index, 1); // Remove the item from the source
    reorderedItems.splice(result.destination.index, 0, reorderedItem); // Insert the item at the destination
  
    setItems(reorderedItems); // Update the state with the new order
  }

  console.log("Showing items:", items) 

  return (

    <>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="droppable" direction="horizontal">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
              className="flex flex-wrap p-4"
            >
              {items.map((item, index) => (
                <Draggable key={item} draggableId={item} index={index}>
                  {(providedDraggable, snapshot) => (
                    <div
                      ref={providedDraggable.innerRef}
                      {...providedDraggable.draggableProps}
                      {...providedDraggable.dragHandleProps}
                      style={getItemStyle(
                        snapshot.isDragging,
                        providedDraggable.draggableProps.style
                      )}
                      className="w-1/2 md:w-1/3 lg:w-1/4 p-4"
                    >

                      <div className="border rounded-lg p-2">
                        <img
                          src={`image-${index + 1}.webp`}
                          alt={`Item ${index + 1}`}
                          className="w-full h-auto" // Set image dimensions
                        />
                        <p className="text-center mt-2">{item.content}</p>
                      </div>
                      
                    </div>
                  )}
                </Draggable>
              
              ))}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    
    </>

  )
};
  
export default Grid;
