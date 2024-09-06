import React from 'react'
import styles from '../styles/Liberacoes.module.css'
import Baixar from '../../components/js/Baixar'
import SearchHistory from '../../components/js/SearchHistory'

const BaixarVeic = () => {
  return (
    <div>
      <div className={styles.liberacoes}>
        <h1><img width="70" height="70" src="https://img.icons8.com/3d-fluency/94/cancel.png" alt="cancel"/> Baixar Veiculo</h1>
        <Baixar />
      </div>
      <h1><img width="70" height="70" src="https://img.icons8.com/3d-fluency/94/search.png" alt="search"/>Buscar Historico do Veiculo</h1>
      <SearchHistory />
    </div>
  )
}

export default BaixarVeic

