import { useState } from 'react';
import EstoqueData from '../../components/js/EstoqueData';
import VeiculosData from '../../components/js/VeiculosData';
import AnoMod from '../../components/js/AnoMod';


const Dashboard = () => {
  const [estoque, setEstoque] = useState(false)



  return (
    <div >
      <div>
        <h1 ><img width="70" height="70" src="https://img.icons8.com/3d-fluency/94/statistic.png" alt="statistic" onClick={() => setEstoque(!estoque)} /> Estatística dos Veiculos em Estoque</h1>
        <div>
          {estoque ?
            <>
              <EstoqueData></EstoqueData>
              <AnoMod></AnoMod>
              <VeiculosData></VeiculosData>
            </>
            : null}
        </div>

      </div>

    </div>
  )
}

export default Dashboard
