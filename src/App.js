import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

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

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Acesso />} />
          <Route path="/contrato" element={<Contrato />} />
          <Route path="/home" element={<Home />} />
          <Route path="/cad_veic" element={<CadVeic />} />
          <Route path="/relatorio_estoque" element={<RelatorioEstoque />} />
          <Route path="/cad_loja" element={<CadLoja />} />
          <Route path="/buscas" element={<Buscas />} />
          <Route path="/baixar_veic" element={<BaixarVeic />} />
          <Route path="/liberacoes" element={<Liberacoes />} />
          <Route path="/inventario" element={<Inventario />} />
          <Route path="/cadastro_manual" element={<CadastroManual />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/footer" element={<Footer />} />
          <Route path="/com_vendas" element={<ComunicacaoVendas />} />
          <Route path="/cad_vendedor" element={<CadVendendor />} />
          <Route path="/cons_venda" element={<ConsVenda />} />
          <Route path="/solic_lib_venda" element={<SolicLibVenda />} />
          <Route path="/est_estoque" element={<EstatisticaEstoque/>}/>
          <Route path="/est_venda_loja" element={<EstVendaLoja/>}/>
          <Route path="/est_venda_instituicao" element={<EstatInstituicao/>}/>
          <Route path='/render_table' element={<RenderTable/>} />
          <Route path='/estat_marcas' element={<EstatisticaMarcas/>}/>
          <Route path='/estat_ano_mod' element={<EstatisticaAnoMod/>}/>
          <Route path='/estatisticas_baixas' element={<EstatisticasBaixas/>}/>
          {/*<Route path='/cad_user' element={<CadUser/>}/>*/}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
