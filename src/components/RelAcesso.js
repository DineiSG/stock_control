import React from 'react'
import styles from './RelAcesso.module.css'
import useControlAcces from '../hooks/useControlAcces'
import * as XLSX from'xlsx'


const RelAcesso = () => {
  
  const url='http://localhost:8090/api/acessos'
  const {data}= useControlAcces(url); 
  

  const generateExcel = ()=>{

    //Formata a data para um formato legível
    const formatTimestamp = (timestamp) => {
      const date = new Date(timestamp);
      return date.toLocaleString(); 
    };

    const formattedData = data.map(item => ({
      
      Data_Movimentaçao:formatTimestamp(item.data_movimentacao),
      Sentido:item.sentido,
      Meio_de_Acesso:item.meio_acesso,
      Cod_Veiculo:item.id_veiculo_acessante
    }))
    

    const worksheet = XLSX.utils.json_to_sheet(formattedData)
    const workbook=XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data")
    XLSX.writeFile(workbook, "Relatorio de Acessos.xlsx")
  }
   



  return (
    <div>
        <div className={styles.container}>
          <h2>Clique abaixo para gerar o relatorio de acessos:</h2>
            <button className={styles.pesquisar} onClick={generateExcel} disabled={data.length === 0}>Gerar Relatorio</button>
        </div>
    </div>
  )
}

export default RelAcesso
