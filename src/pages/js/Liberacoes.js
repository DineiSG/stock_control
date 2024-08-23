import React from 'react'
import styles from '../styles/Liberacoes.module.css'
import Liberar from '../../components/js/Lberar'
import SearchLiberacoes from '../../components/js/SearchLiberacoes'

const Liberacoes = () => {

  
  return (
    <div>
      <div className={styles.liberacoes}>
      <Liberar></Liberar>   
      </div>
      <SearchLiberacoes></SearchLiberacoes>
    </div>
    
  )
}

export default Liberacoes
