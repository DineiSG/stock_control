import { useState } from 'react';
import EstoqueData from '../../components/graficos/EstoqueData';
import VeiculosData from '../../components/graficos/VeiculosData';
import AnoMod from '../../components/graficos/AnoMod';
import BaixasData from '../../components/graficos/BaixasData';
import VendasData from '../../components/graficos/VendasData';
import InstData from '../../components/graficos/InstData';


const Dashboard = () => {
  const [estoque, setEstoque] = useState(false)
  const [baixas, setBaixas] = useState(false)
  const [marcas, setMarcas] = useState(false)
  const [anoModelo, setAnoModelo]=useState(false)
  const [vendas, setVendas]=useState(false)
  const [instituicao, setInstituicao]=useState(false)



  return (
    <div >
      <div class="container-md" >
        <h1 ><img width="70" height="70" src="https://img.icons8.com/3d-fluency/94/statistic.png" alt="statistic" onClick={() => setEstoque(!estoque)} />Estoque Geral</h1>
        <div>
          {estoque ?
            <>
              <EstoqueData />
            </>
            : null}
        </div>
      </div>
      <div class="container-md">
        <h1 ><img width="70" height="70" src="https://img.icons8.com/3d-fluency/94/statistic.png" alt="statistic" onClick={() => setMarcas(!marcas)} />Estoque Por Marcas</h1>
        <div>
          {marcas ?
          <>
          <VeiculosData />
          </>
        
      :null}
        </div>
      </div>
      <div class="container-md">
        <h1 ><img width="70" height="70" src="https://img.icons8.com/3d-fluency/94/statistic.png" alt="statistic" onClick={() => setAnoModelo(!anoModelo)} />Estoque Por Ano Modelo</h1>
        <div>
          {anoModelo ?
          <>
          <AnoMod />
          </>
      :null}
        </div>
      </div>
      <div class="container-md">
        <h1 ><img width="70" height="70" src="https://img.icons8.com/3d-fluency/94/statistic.png" alt="statistic" onClick={() => setBaixas(!baixas)} />Baixas</h1>
        <div>
          {baixas ?
            <>
              <BaixasData />
            </>
            : null}
        </div>
      </div>
      <div class="container-md">
        <h1 ><img width="70" height="70" src="https://img.icons8.com/3d-fluency/94/statistic.png" alt="statistic" onClick={() => setVendas(!vendas)} />Vendas Por Loja</h1>
        <div>
          {vendas ?
            <>
              <VendasData/>
            </>
            : null}
        </div>
      </div>
      <div class="container-md">
        <h1 ><img width="70" height="70" src="https://img.icons8.com/3d-fluency/94/statistic.png" alt="statistic" onClick={() => setInstituicao(!instituicao)} />Vendas Por Instituicao Financeira</h1>
        <div>
          {instituicao ?
            <>
              <InstData/>
            </>
            : null}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
