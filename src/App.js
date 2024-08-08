
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar';
import Home from './pages/Home';
import CadVeic from './pages/CadVeic';
import RelatorioEstoque from './pages/RelatórioEstoque';
import CadLoja from './pages/CadLoja';
import Acesso from './components/Acesso';
import Buscas from './pages/Buscas';
import RelatorioAcessos from './pages/RelatorioAcessos';
import Liberacoes from './pages/Liberacoes'
import BaixarVeic from './pages/BaixarVeic';



function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Acesso />} />
          <Route path='/home' element={<Home />} />
          <Route path='/cad_veic' element={<CadVeic />} />
          <Route path='/relatorio_estoque' element={<RelatorioEstoque />} />
          <Route path='/relatorio_acesso' element={<RelatorioAcessos />} />
          <Route path='/cad_loja' element={<CadLoja />} />
          <Route path='/buscas' element={<Buscas />} />
          <Route path='/baixar_veic' element={<BaixarVeic/>} />
          <Route path='/liberacoes' element={<Liberacoes />} />

          {/*<Route path='/cad_user' element={<CadUser/>}/>*/}
        </Routes>

      </BrowserRouter>

    </div>
  );
}

export default App;
