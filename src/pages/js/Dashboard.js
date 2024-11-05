import { useState } from 'react';
import EstoqueData from '../../components/graficos/EstoqueData';
import VeiculosData from '../../components/graficos/VeiculosData';
import AnoMod from '../../components/graficos/AnoMod';
import VendasData from '../../components/graficos/VendasData';


const Dashboard = () => {
  const [estoque, setEstoque] = useState(false)
  const [financeiro, setFinanceiro] = useState(false)



  return (
    <div >
      <div class="container-md" >
        <h1 ><img width="70" height="70" src="https://img.icons8.com/3d-fluency/94/statistic.png" alt="statistic" onClick={() => setEstoque(!estoque)} />Estoque</h1>
        <div>
          {estoque ?
            <>
              <EstoqueData />
              <AnoMod />
              <VeiculosData />
            </>
            : null}
        </div>
      </div>
      <div class="container-md">
        <h1 ><img width="70" height="70" src="https://img.icons8.com/3d-fluency/94/statistic.png" alt="statistic" onClick={() => setFinanceiro(!financeiro)} />Financeiro</h1>
        <div>
          {financeiro ?
            <>
            <VendasData/>
            </>
            : null}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
