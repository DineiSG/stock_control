import React from 'react'
import { useState } from 'react'
import styles from './Filter.module.css'


const Filter = () => {
  const [filtroLoja, setFiltroLoja]=useState(false)
  const [filtroMarca, setFiltroMarca]=useState(false)
  const [filtroModelo, setFiltroModelo]=useState(false)


  return (
    <div>
        <div class="container">
          <h2>Selecione um filtro:</h2>
          <div className={styles.select}>
              <button className={styles.filtrar} onClick={()=>setFiltroLoja(!filtroLoja)}>{filtroLoja?'Por Loja':'Filtrar por Loja'}</button>
              {filtroLoja ? 
                <table className="table table-success">
                  <thead>
                      <tr>
                        <th>#</th>
                        <th>Loja</th>
                        <th>Marca</th>
                        <th>Modelo</th>
                        <th>Ano</th>
                        <th>Cor</th>
                        <th>Nº Tag</th>
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
              <button className={styles.filtrar} onClick={()=>setFiltroMarca(!filtroMarca)}>{filtroMarca?'Por Marca':'Filtrar por Marca'}</button>
              {filtroMarca ? 
                <table className="table table-success">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Marca</th>
                      <th>Modelo</th>
                      <th>Ano</th>
                      <th>Cor</th>
                      <th>Loja</th>
                      <th>Nº Tag</th>
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
              <button className={styles.filtrar} onClick={()=>setFiltroModelo(!filtroModelo)}>{filtroModelo? 'Por Modelo':'Filtrar por Modelo'}</button>
              {filtroModelo? 
                <table className="table table-success">
                  <thead>
                      <tr>
                        <th>#</th>
                        <th>Modelo</th>
                        <th>Marca</th>
                        <th>Ano</th>
                        <th>Cor</th>
                        <th>Loja</th>
                        <th>Nº Tag</th>
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
    </div>
  )
}

export default Filter
