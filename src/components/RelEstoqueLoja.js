/*Este componente é responsável por buscar os veiculos e gerar os relatorios em excel */
import { useState } from 'react'
import styles from './RelEstoqueLoja.module.css'
import * as XLSX from'xlsx'



const RelEstoqueLoja = () => {
 
    const [filtroLoja, setFiltroLoja]=useState(false)
    const [query, setQuery]= useState()
    const [results, setResults]=useState([])
    const [error, setError]= useState('')

    const handleSearch = async (e)=>{
        e.preventDefault();
        if(!query) return;

        const upperCaseQuery = query.toUpperCase();
        try{
            const response= await fetch(`http://localhost:8090/api/veiculos/unidade/${upperCaseQuery}`)
            const data = await response.json()
            const filteredResults = data.filter(veiculo => veiculo.unidade.toUpperCase()=== upperCaseQuery);

            if(filteredResults.length > 0 ){
                setResults(filteredResults)
                setError('')
            }else{
                setResults([])
                setError(window.alert("Nao há nenhuma loja com o nome informado."))
            }

            
        }catch(error){
            window.alert("Erro ao buscar dados: ", error)
            
        }

        
    }

    /*Funçao para gerar o relatorio do Excel com as colunas que serao exibidas já definidas */
    const generateExcel = ()=>{
      const formattedData = results.map(item => ({
        Loja:item.unidade,
        Cod_Veiculo:item.id,
        Marca:item.marca,
        Modelo:item.modelo,
        Ano_de_Fabricaçao:item.ano,
        Cor:item.cor,
        Renavan:item.renavan,
        Placa:item.placa,
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
          <div>
              <h2>Informe o nome da loja:</h2>
                <form className={styles.pesquisa} onSubmit={handleSearch}>
                <label>
                    <span>Loja:</span>
                    <input type='text' value={query} onChange={(e)=>setQuery(e.target.value)} required/> 
                </label>
                <button className={styles.buscar} type='submit'onClick={()=>setFiltroLoja(!filtroLoja)}>{filtroLoja?'Buscar':'Buscar'}</button>
                </form>
          </div>
            {filtroLoja ? 
               <table className="table table-primary table-striped-columns" border="1">
                  <thead>
                      <tr>
                          <th>Loja</th>
                          <th>Cod.Veiculo</th>
                          <th>Marca</th> 
                          <th>Modelo</th>
                          <th>Cor</th>
                          <th>Ano</th>
                          <th>Renavan</th>
                          <th>Placa</th>
                          <th>Nº Tag</th>
                       </tr>
                  </thead>
                  <tbody>
                    {results.map(result =>(
                      <tr key={result.id}>
                        <td>{result.unidade}</td>
                        <td>{result.id}</td>
                        <td>{result.marca}</td>
                        <td>{result.modelo}</td>
                        <td>{result.cor}</td>
                        <td>{result.ano}</td>
                        <td>{result.renavan}</td>
                        <td>{result.placa}</td>
                        <td>{result.valor_meio_acesso}</td>
                      </tr>

                    ))}
                  </tbody>
                </table>: null }
          
          <button className={styles.filtrar}onClick={generateExcel} disabled={results.length === 0}>Gerar Relatorio</button>
          <div className={styles.select}>
        </div>
          
        </div>
    </div>
  )
}

export default RelEstoqueLoja
