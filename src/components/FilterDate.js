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
            <button className={styles.pesquisar} onClick={()=>setFiltroData(!filtroData)}><svg xmlns="http://www.w3.org/2000/svg" width="35" height="20" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
            </svg>
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
