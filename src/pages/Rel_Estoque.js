import React from 'react'
import styles from './Rel_Estoque.module.css' 
import Filter from '../components/Filter'


const Rel_Estoque = () => {
  return (
    <div className="styles.container-md">
        <h1>Relatório de Estoque</h1>
        <div className={styles.options}>
            <Filter></Filter>
        </div>
        
      
    </div>
  )
}

export default Rel_Estoque
