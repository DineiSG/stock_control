import React from 'react'
import styles from './Liberacoes.module.css'
import Liberar from '../components/Lberar'
import SearchLiberacoes from '../components/SearchLiberacoes'

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
