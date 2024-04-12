import styles from'./App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Cad_Veic from './pages/Cad_Veic';
import Rel_Estoque from './pages/Rel_Estoque';

function App() {
  return (
    <div className="App">
     <BrowserRouter>
     <Navbar/>
     <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/cad_veic' element={<Cad_Veic/>}/>
      <Route path='/rel_estoque' element={<Rel_Estoque/>}/>
     </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
