
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Navbar from './components/Navbar';
import Home from './pages/Home';
import CadVeic from './pages/CadVeic';
import RelEstoque from './pages/RelEstoque';
import CadLoja from './pages/CadLoja';
import RelAcesso from './pages/RelAcesso';

function App() {
  return (
    <div className="App">
     <BrowserRouter>
     <Navbar/>
     <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/cad_veic' element={<CadVeic/>}/>
      <Route path='/rel_estoque' element={<RelEstoque/>}/>
      <Route path='/cad_loja' element={<CadLoja/>}/>
      <Route path='/rel_acesso' element={<RelAcesso/>}/> 
     </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
