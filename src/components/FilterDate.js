import React from 'react'
import styles from './FilterDate.module.css'
import { useState } from 'react'

const FilterDate = () => {
    const [filtroData, setFiltroData]=useState(false)



  return (
    <div>
        <div className={styles.container}>
        <h2>Informe o período:</h2>
        <form className={styles.periodo}>
            <label>
                Data Inicial:
            </label>    
                <input type="date" className={styles.inicio} required />
            <label>
                Data Final:
            </label>  
                <input type="date" className={styles.fim} required />
        </form>        
            <button className={styles.pesquisar} onClick={()=>setFiltroData(!filtroData)}>
            {filtroData?'Pesquisar':'Pesquisar'}</button>
            {filtroData ?
                <table className="table table-success">
                  <thead>
                      <tr>
                        <th>Nº Tag</th>
                        <th>Placa</th>
                        <th>Modelo</th>
                        <th>Marca</th>
                        <th>Loja</th>
                        <th>Status</th>
                        <th>Data Ult. Status</th>
                      </tr>
                  </thead>
                  <tbody>   
                      <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                  </tbody>
                </table> : null }
        
        </div>
    </div>
  )
}

export default FilterDate
