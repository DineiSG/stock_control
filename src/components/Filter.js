import React from 'react'
import { useState, useEffect } from 'react'
import styles from './Filter.module.css'
import useCombinedData from '../hooks/useCombinedData'
import * as XLSX from'xlsx'



const Filter = () => {
  const [filtroLoja, setFiltroLoja]=useState(false)

  
  const urlA='http://localhost:8090/api/lojas'
  const urlB='http://localhost:8090/api/veiculos'
  const sortKey = 'descricao'
  const{data}= useCombinedData(urlA,urlB, sortKey)

  /*Funçao para gerar o relatorio do Excel com as colunas que serao exibidas já definidas */
  const generateExcel = ()=>{
    const formattedData = data.map(item => ({
      Loja:item.descricao,
      Marca:item.marca,
      Modelo:item.modelo,
      Cor:item.cor,
      Placa:item.placa,
      Ano_de_Fabricaçao:item.ano,
      Num_Tag:item.valor_meio_acesso


    }))

    const worksheet = XLSX.utils.json_to_sheet(formattedData)
    const workbook=XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data")
    XLSX.writeFile(workbook, "Relatorio de Estoque.xlsx")
  }

    
  return (
    <div>
        <div className={styles.container}>
          <h2>Clique no botao abaixo para gerar o relatorio de estoque:</h2>
          <button className={styles.filtrar}onClick={generateExcel} disabled={data.length === 0}>Gerar Relatorio em Excel</button>
          <div className={styles.select}>
          </div>
        </div>
    </div>
  )
}

export default Filter
