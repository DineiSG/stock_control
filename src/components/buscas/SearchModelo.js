import React, { useState } from 'react'
import styles from '../styles/SearchForm.module.css'

const SearchModelo = () => {
    const [busca, setBusca] = useState(false)
    const [query, setQuery] = useState()
    const [results, setResults] = useState([])
    const [error, setError] = useState('')

    /*Função que busca informações de um veiculo de acordo com o modelo */
    const handleSearch = async (e) => {
        e.preventDefault();
        if (!query) return;
    
        const upperCaseQuery = query.toUpperCase();
        try {
            const response = await fetch(`http://localhost:8090/api/v1/veiculos?modelo=${upperCaseQuery}`);
            const data = await response.json();
    
            // Filtra os veículos que possuem o modelo parcialmente correspondente e com tag válida
            const filteredResults = data.filter(veiculo => 
                veiculo.modelo.toUpperCase().includes(upperCaseQuery.replace('%', '')) && 
                veiculo.valor_meio_acesso &&
                veiculo.unidade !==null// Verifica se a tag está cadastrada
            );
    
            if (filteredResults.length > 0) {
                setResults(filteredResults);
                setError('');
            } else {
                setResults([]);
                window.alert("Não há nenhum veículo do modelo informado ou com valor_meio_acesso cadastrado.");
            }
        } catch (error) {
            window.alert("Erro ao buscar dados: " + error.message);
        }
    };

    return (
        <div className={styles.container}>
            <div class="container-lg">
                <h2 className={styles.title}>INFORME O MODELO DE UM VEÍCULO PARA BUSCAR INFORMAÇÕES:</h2>
                <form className={styles.pesquisa} onSubmit={handleSearch}>
                    <label>
                        <p>Modelo:</p>
                        <input type='text' value={query} onChange={(e) => setQuery(e.target.value)} required />
                    </label>
                    <button className={styles.btn_buscar} type='submit' onClick={() => setBusca(!busca)}>
                        {busca ? 'Resultados' : 'Buscar'}</button>
                </form>
            </div>
            {busca ?
                <div className={styles.table}>
                    <table className="table table-secondary table-striped-columns" border="1">
                        <thead>
                            <tr>
                                <th>Loja</th>
                                <th>Marca</th>
                                <th>Modelo</th>
                                <th>Cor</th>
                                <th>Ano Fabricação</th>
                            </tr>
                        </thead>
                        <tbody>
                            {results.map(result => (
                                <tr key={result.id}>
                                    <td>{result.unidade}</td>
                                    <td>{result.marca}</td>
                                    <td>{result.modelo}</td>
                                    <td>{result.cor}</td>
                                    <td>{result.ano}</td>
                                    
                                </tr>

                            ))}
                        </tbody>
                    </table>

                </div> : null}
        </div>
    )

}

export default SearchModelo
