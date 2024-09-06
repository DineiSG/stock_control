
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/js/Navbar';
import Home from './pages/js/Home';
import CadVeic from './pages/js/CadVeic';
import RelatorioEstoque from './pages/js/RelatórioEstoque';
import CadLoja from './pages/js/CadLoja';
import Acesso from './components/js/Acesso';
import Buscas from './pages/js/Buscas';
import RelatorioAcessos from './pages/js/RelatorioAcessos';
import Liberacoes from './pages/js/Liberacoes'
import BaixarVeic from './pages/js/BaixarVeic';
import Inventario from './pages/js/Inventario';
import CadastroManual from './pages/js/CadastroManual';



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
          <Route path='/liberacoes' element={<Liberacoes />}/>
          <Route path='/inventario' element={<Inventario/>}/>
          <Route path='/cadastro_manual' element={<CadastroManual/>}/>

          {/*<Route path='/cad_user' element={<CadUser/>}/>*/}
        </Routes>

      </BrowserRouter>

    </div>
  );
}

export default App;
