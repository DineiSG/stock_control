import React from 'react'
import styles from "../../components/styles/Data.module.css"
import InstData from '../../components/graficos/InstData'

const EstatInstituicao = () => {
  return (
    <div>
      <p className={styles.p_titulo}><img width="70" height="70" src="https://img.icons8.com/3d-fluency/94/transaction.png" alt="transaction" /> Vendas Por Instituição Financeira</p>
      <div class='container-md' id='printable'>
        <div className={styles.data_container}>
          <>
            <InstData></InstData>
          </>
        </div>
      </div>
    </div>

  )
}

export default EstatInstituicao
