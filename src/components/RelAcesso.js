import React from 'react'
import styles from './Relatorios.module.css'
import { useState } from 'react';



const RelAcesso = () => {
  
  const [filtroAcesso, setFiltroAcesso]=useState(false)
  const [query, setQuery]= useState()
  const [results, setResults]=useState([])
  const [accessResult, setAccessResult]=useState([])
  const [setError]= useState('')

    /*Função que trata do retorno de data */
    const formatTimestamp = (timestamp) => {
      const date = new Date(timestamp);
      return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour:'2-digit', minute:'2-digit' }); 
    };

    /*Função que busca o estoque de acordo com a loja */
    const handleSearch = async (e)=>{
      e.preventDefault();
      if(!query) return;

      const upperCaseQuery = query.toUpperCase();
      try{
        const response= await fetch(`http://localhost:8090/api/veiculos?placa=${upperCaseQuery}`)
        const data = await response.json()
        const filteredResults = data.filter(veiculo => veiculo.placa.toUpperCase()=== upperCaseQuery);

        if(filteredResults.length > 0 ){
          setResults(filteredResults)
          

          const idVeiculoAcessante = filteredResults[0].id //Capturando o id do resultado da pesquisa
          const relatedDataResponse = await fetch(`http://localhost:8090/api/acessos/historico/${idVeiculoAcessante}`)

          if (!relatedDataResponse.ok){
            throw new Error('Erro ao buscar dados de acesso.')
          }

          const relatedData= await relatedDataResponse.json()
          setAccessResult(relatedData)
        }else{
          setResults([])
          alert('Nao ha nenhum veiculo com a placa informada')
          setError(window.alert("Nao há nenhum veiculo com a placa informada."))
        }
      }catch(error){
        console.error('Erro: ', error)
        
      }
    }

    return (
    <div>
        <div className={styles.container}>
        
          <div className={styles.input}>
              <h2>Informe a placa do veiculo:</h2>
                <form className={styles.pesquisa} onSubmit={handleSearch}>
                <label>
                    <span>Placa:</span>
                    <input type='text' value={query} onChange={(e)=>setQuery(e.target.value)} required/> 
                </label>
                <button className={styles.buscar} type='submit'onClick={()=>setFiltroAcesso(!filtroAcesso)}>{filtroAcesso?'Buscar':'Buscar'}</button>
                </form>
          </div>
        </div>
          <div className={styles.table} id='printable'>
            {filtroAcesso?
               <table className="table table-primary table-striped-columns" border="1">
                  <thead>
                  {results.map(result =>(
                      <tr className={styles.head}key={result.id}>
                          <th>Cod. Veiculo: {result.id}</th>
                          <th>Placa: {result.placa} </th>
                          <th>Loja: {result.unidade}</th>
                          <th>Marca: {result.marca}</th> 
                          <th>Modelo: {result.modelo}</th>
                          <th>Cor: {result.cor}</th>
                          <th>Data Cadastro: {formatTimestamp(result.data_registro)}</th>
                          <th>Status: {result.veiculo_status}</th>
                       </tr>
                       ))}
                  </thead>
                </table>: null }
              {filtroAcesso ? 
               <table className="table table-primary table-striped-columns" border="1">
                  <thead>
                      <tr>
                          <th>Data e Hora da Movimentaçao</th>
                          <th>Sentido: E = Entrada S = Saída</th>
                       </tr>
                  </thead>
                  <tbody>
                    {accessResult.map(result =>(
                      <tr key={result.idVeiculoAcessante}>
                        <td>{formatTimestamp(result.data_movimentacao)}</td>
                        <td>{result.sentido}</td>
                      </tr>
                    ))}

                  </tbody>
                </table>: null }
          </div>
        
    </div>
  )

}

export default RelAcesso
