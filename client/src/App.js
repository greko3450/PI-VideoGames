import './App.css';

import {Routes, Route} from "react-router-dom"
import Cards from './components/Cards.jsx';
import Nav from './components/Nav.jsx';
import Detail from './components/pages/Detail.jsx';
import Form from './components/formulario/Form.jsx';
import Landing from './components/pages/Landing';


function App() {
  return (
    <div className="App" style={{margin: "25px"}}>
      <Routes>
        <Route path="/" element={<Landing/>} />
        <Route path='/videogames' element={<><Nav/><Cards/></>} />
        <Route path="/videogames/:idGame" element={<Detail/>} />
        <Route path='/form' element={<Form/>}/>
      </Routes>
      
    </div>
  );
}

export default App;
        
      
      
