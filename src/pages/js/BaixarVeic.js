import React from 'react'
import styles from '../styles/Liberacoes.module.css'
import Baixar from '../../components/acoes/Baixar'

const BaixarVeic = () => {
  return (
    <div>
      <div className={styles.liberacoes}>
        <h1><img width="70" height="70" src="https://img.icons8.com/3d-fluency/94/cancel.png" alt="cancel" /> Baixar Veiculo</h1>
        <Baixar />
      </div>
    </div>
  )
}

export default BaixarVeic

