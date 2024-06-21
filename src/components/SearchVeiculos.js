import React, { useState } from 'react'
import styles from './SearchForm.module.css'

const SearchVeiculos = () => {
    const [query, setQuery]= useState()
    const [results, setResults]=useState([])
    const [error, setError]= useState('')

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
                setError('')
            }else{
                setResults([])
                setError(window.alert("Nao há nenhum veiculo com a placa informada."))
            }

            
        }catch(error){
            window.alert("Erro ao buscar dados: ", error)
        }

        
    }
    return (
        <div >
            <div className={styles.container}>
                <div class="container-lg">
                    <h2>Informe a placa do carro para buscar informações:</h2>
                    <form className={styles.pesquisa} onSubmit={handleSearch}>
                    <label>
                        <span>Placa:</span>
                       <input type='text' value={query} onChange={(e)=>setQuery(e.target.value)} required/> 
                    </label>
                    <button className={styles.buscar} type='submit'>Buscar</button>
                    </form>
                </div>
               <table className="table table-success" border="1">
                  <thead>
                      <tr>
                          <th>Cod. Veiculo</th>
                          <th>Marca</th> 
                          <th>Modelo</th>
                          <th>Cor</th>
                          <th>Ano</th>
                          <th>Renavan</th>
                          <th>Loja</th>
                          <th>Nº Tag</th>
                       </tr>
                  </thead>
                  <tbody>
                    {results.map(result =>(
                      <tr key={result.id}>
                        <td>{result.id}</td>
                        <td>{result.marca}</td>
                        <td>{result.modelo}</td>
                        <td>{result.cor}</td>
                        <td>{result.ano}</td>
                        <td>{result.renavan}</td>
                        <td>{result.unidade}</td>
                        <td>{result.valor_meio_acesso}</td>
                      </tr>

                    ))}
                  </tbody>
                </table>
            </div>
        </div>
    )
}

export default SearchVeiculos
