import React from 'react'
import styles from '../styles/Liberacoes.module.css'
import Liberar from '../../components/acoes/Lberar'
import CancelLiberacao from '../../components/acoes/CancelLiberacao'

const Liberacoes = () => {


  return (
    <div>
      <div className={styles.liberacoes}>
        <Liberar></Liberar>
      </div> 
      <h1><img width="70" height="70" src="https://img.icons8.com/3d-fluency/94/delete-sign.png" alt="delete-sign"/> Cancelar Liberação</h1>
      <div className="container-md">
        <CancelLiberacao></CancelLiberacao>
      </div>
    </div>

  )
}

export default Liberacoes
