import styles from'./App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Cad_Veic from './pages/Cad_Veic';

function App() {
  return (
    <div className="App">
     <BrowserRouter>
     <Navbar/>
     <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/cad_veic' element={<Cad_Veic/>}/>
     </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
