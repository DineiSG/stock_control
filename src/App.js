import { BrowserRouter, Routes, Route} from "react-router-dom";

import Navbar from "./components/outros/Navbar";
import Home from "./pages/js/Home";
import CadVeic from "./pages/js/CadVeic";
import RelatorioEstoque from "./pages/js/RelatórioEstoque";
import CadLoja from "./pages/js/CadLoja";
import Acesso from "./components/outros/Acesso";
import Buscas from "./pages/js/Buscas";
import Liberacoes from "./pages/js/Liberacoes";
import BaixarVeic from "./pages/js/BaixarVeic";
import Inventario from "./pages/js/Inventario";
import CadastroManual from "./pages/js/CadastroManual";
import Dashboard from "./pages/js/Dashboard";
import Footer from "./components/outros/Footer";
import ComunicacaoVendas from "./components/acoes/ComVenda";
import CadVendendor from "./pages/js/CadVendendor";
import ConsVenda from "./components/buscas/ConsVenda";
import SolicLibVenda from "./components/acoes/SolicLibVenda";
import Contrato from "./components/outros/Contrato";
import EstatisticaEstoque from "./pages/js/EstatisticaEstoque";
import EstVendaLoja from "./pages/js/EstVendaLoja";
import EstatInstituicao from "./pages/js/EstatInstituicao";
import RenderTable from "./components/outros/RenderTable";
import EstatisticaMarcas from "./pages/js/EstatisticaMarcas";
import EstatisticaAnoMod from "./pages/js/EstatisticaAnoMod";
import EstatisticasBaixas from "./pages/js/EstatisticasBaixas";
import AccessModal from "./components/outros/AccessModal";
import ProtectedRoute from "./components/outros/ProtectedRoute";
import CadUser from "./pages/js/CadUser";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/access" element={<AccessModal />} />
            <Route path="/" element={<Acesso />} />
            <Route path="/contrato" element={<ProtectedRoute> <Contrato /> </ProtectedRoute> } />
            <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute> } />
            <Route path="/cad_veic" element={<ProtectedRoute><CadVeic /></ProtectedRoute> } />
            <Route path="/relatorio_estoque" element={<ProtectedRoute><RelatorioEstoque /></ProtectedRoute> } />
            <Route path="/cad_loja" element={<ProtectedRoute><CadLoja /></ProtectedRoute> } />
            <Route path="/buscas" element={<ProtectedRoute><Buscas /></ProtectedRoute> } />
            <Route path="/baixar_veic" element={<ProtectedRoute><BaixarVeic /></ProtectedRoute> } />
            <Route path="/liberacoes" element={<ProtectedRoute><Liberacoes /></ProtectedRoute> } />
            <Route path="/inventario" element={<ProtectedRoute><Inventario /></ProtectedRoute> } />
            <Route path="/cadastro_manual" element={<CadastroManual />} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute> } />
            <Route path="/footer" element={<ProtectedRoute><Footer /></ProtectedRoute> } />
            <Route path="/com_vendas" element={<ProtectedRoute><ComunicacaoVendas /></ProtectedRoute> } />
            <Route path="/cad_vendedor" element={<ProtectedRoute><CadVendendor /></ProtectedRoute> } />
            <Route path="/cons_venda" element={<ProtectedRoute><ConsVenda /></ProtectedRoute> } />
            <Route path="/solic_lib_venda" element={<ProtectedRoute><SolicLibVenda /></ProtectedRoute> } />
            <Route path="/est_estoque" element={<ProtectedRoute><EstatisticaEstoque /></ProtectedRoute> } />
            <Route path="/est_venda_loja" element={<ProtectedRoute><EstVendaLoja /></ProtectedRoute> } />
            <Route path="/est_venda_instituicao" element={<ProtectedRoute><EstatInstituicao /></ProtectedRoute> } />
            <Route path='/render_table' element={<ProtectedRoute><RenderTable /></ProtectedRoute> } />
            <Route path='/estat_marcas' element={<ProtectedRoute><EstatisticaMarcas /></ProtectedRoute> } />
            <Route path='/estat_ano_mod' element={<ProtectedRoute><EstatisticaAnoMod /></ProtectedRoute> } />
            <Route path='/estatisticas_baixas' element={<ProtectedRoute><EstatisticasBaixas /></ProtectedRoute> } />
            <Route path='/cad_user' element={<CadUser/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
