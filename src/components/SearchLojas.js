import React, { useState } from 'react'
import styles from './SearchForm.module.css'



const SearchLojas = () => {
    const [query, setQuery]= useState()
    const [results, setResults]=useState([])
    const [error, setError]= useState('')

    const handleSearch = async (e)=>{
        e.preventDefault();
        if(!query) return;

        const upperCaseQuery = query.toUpperCase();
        try{
            const response= await fetch(`http://localhost:8090/api/lojas?descricao=${upperCaseQuery}`)
            const data = await response.json()
            const filteredResults = data.filter(loja => loja.descricao.toUpperCase() === upperCaseQuery);

            if(filteredResults.length > 0){
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
    return (
        <div >
            <div className={styles.container}>
                <div class="container-lg">
                    <h2>Informe o nome da loja para buscar informações:</h2>
                    <form className={styles.pesquisa} onSubmit={handleSearch}>
                    <label>
                        <span>Loja:</span>
                       <input type='text' value={query} onChange={(e)=>setQuery(e.target.value)} required/> 
                    </label>
                    <button className={styles.buscar} type='submit'>Buscar</button>
                    </form>
                </div>
               <table className="table table-success" border="1">
                  <thead>
                      <tr>
                          <th>Cod. Loja</th>
                          <th>Nome</th> 
                          <th>Box</th>
                          <th>Telefone</th>
                          <th>Email</th>
                          <th>Qtd Vagas</th>
                       </tr>
                  </thead>
                  <tbody>
                    {results.map(result =>(
                      <tr key={result.id}>
                        <td>{result.id}</td>
                        <td>{result.descricao}</td>
                        <td>{result.box}</td>
                        <td>{result.telefone}</td>
                        <td>{result.email}</td>
                        <td>{result.vagas}</td>
                      </tr>

                    ))}
                  </tbody>
                </table>
            </div>
        </div>
    )
}

export default SearchLojas
