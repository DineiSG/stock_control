import React from 'react'
import styles from './RelEstoque.module.css' 
import Filter from '../components/Filter'


const RelEstoque = () => {
  return (
    <div>
      <h1>Relatório de Estoque</h1>
      <div className="container-md">
          <div className={styles.options}>
              <Filter></Filter>
          </div>
          
        
      </div>
    </div>
  )
}

export default RelEstoque
