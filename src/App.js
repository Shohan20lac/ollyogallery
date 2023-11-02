import './App.css';
import Grid from './components/Grid';
import Topbar from './components/Topbar';
import "./styles.css"

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
  return (
    <Body>
      <Topbar/>
      <Divider/>
      <Grid/>
    </Body>
  );
}

export default App;
