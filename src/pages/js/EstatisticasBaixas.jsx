import React from 'react'
import BaixasData from '../../components/graficos/BaixasData'
import styles from "../../components/styles/Data.module.css"

const EstatisticasBaixas = () => {
  return (
    <div>
      <p className={styles.p_titulo}><img width="70" height="70" src="https://img.icons8.com/3d-fluency/94/bar-chart.png" alt="bar-chart" /> Movimentação de Estoque - Baixas</p>
      <div class='container-md' id='printable'>
        <div className={styles.data_container}>
          <>
            <BaixasData></BaixasData>
          </>
        </div>
      </div>
    </div>

  )
}

export default EstatisticasBaixas
