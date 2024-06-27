
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Navbar from './components/Navbar';
import Home from './pages/Home';
import CadVeic from './pages/CadVeic';
import Relatorios from './pages/Relatórios';
import CadLoja from './pages/CadLoja';
import Acesso from './components/Acesso';
import Buscas from './pages/Buscas';
import Search from './pages/Search';
import Footer from './components/Footer';


function App() {
  return (
    <div className="App">
     <BrowserRouter>
     <Navbar/>
     <Routes>
      <Route path='/' element={<Acesso/>}/>
      <Route path='/home' element={<Home/>} />
      <Route path='/cad_veic' element={<CadVeic/>}/>
      <Route path='/relatorios' element={<Relatorios/>}/>
      <Route path='/cad_loja' element={<CadLoja/>}/>
      <Route path='/buscas' element={<Buscas/>}/> 
      <Route path='search' element={<Search/>}/>
      {/*<Route path='/cad_user' element={<CadUser/>}/>*/}
     </Routes>
     <Footer/>
     </BrowserRouter>
     
    </div>
  );
}

export default App;
