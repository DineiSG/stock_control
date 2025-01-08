import React from 'react'
import styles from "../../components/styles/Data.module.css"
import VendasData from '../../components/graficos/VendasData'

const EstVendaLoja = () => {
  return (
    <div>
      <p className={styles.p_titulo}><img width="70" height="70" src="https://img.icons8.com/3d-fluency/94/transaction.png" alt="transaction" /> Vendas Por Loja</p>
      <div class='container-md' id='printable'>
        <div className={styles.data_container}>
          <>
            <VendasData></VendasData>
          </>
        </div>
      </div>
    </div>

  )
}

export default EstVendaLoja
