import React from 'react'
import VeiculosData from '../../components/graficos/VeiculosData'
import styles from "../../components/styles/Data.module.css"

const EstatisticaMarcas = () => {
  return (
    <div>
      <p className={styles.p_titulo}><img width="70" height="80" src="https://img.icons8.com/3d-fluency/94/bar-chart.png" alt="bar-chart" /> Estoque por Marcas</p>
      <div class='container-md' id='printable'>
        <div className={styles.data_container}>
          <>
            <VeiculosData></VeiculosData>
          </>
        </div>
      </div>
    </div>
  )
}

export default EstatisticaMarcas
