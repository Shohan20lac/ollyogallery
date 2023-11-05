import './App.css';
import Grid from './components/Grid';
import Topbar from './components/Topbar';
import "./styles.css"
import { useState } from 'react';

const Body = ({children}) => (
  <div className="background-panel">
    <div className="foreground-card">
      {children}
    </div>
  </div>
  
)

const Divider = () =>
  <div style = {{backgroundColor:'black', width: `100%`, height:`1px`}}>
  </div>




function App() {

  const [gridItems, setGridItems] = useState([
    { id: 'item-1', content: 'Item 1' },
    { id: 'item-2', content: 'Item 2' },
    { id: 'item-3', content: 'Item 3' },
    // Add more items as needed
  ]);
  
  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
  
    const reorderedItems = [...gridItems];
    const [reorderedItem] = reorderedItems.splice(result.source.index, 1);
    reorderedItems.splice(result.destination.index, 0, reorderedItem);
  
    setGridItems(reorderedItems);
  };

  return (
    <Body>
      <Topbar/>
      <div>
        <h1>2D Grid using React Beautiful DnD</h1>
        <Grid items={gridItems} onDragEnd={onDragEnd} />
      </div>
    </Body>
  );
}

export default App;
