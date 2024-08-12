import React from 'react'
import { useState } from 'react'
import styles from './SearchForm.module.css'

const SearchHistory = () => {
    const [filtroAcesso, setFiltroAcesso] = useState(false)
    const [query, setQuery] = useState()
    const [results, setResults] = useState([])
    const [setError] = useState('')



    /*Função que trata do retorno de data */
    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
    };

    /*Função que busca o estoque de acordo com a loja */
    const handleSearch = async (e) => {
        e.preventDefault();
        if (!query) return;

        const upperCaseQuery = query.toUpperCase();
        try {
            const response = await fetch(`http://localhost:8090/api/veiculos?placa=${upperCaseQuery}`)
            const data = await response.json()
            const filteredResults = data.filter(veiculo => veiculo.placa.toUpperCase() === upperCaseQuery);
            if (filteredResults.length > 0) {
                setResults(filteredResults)
                setError('')
            } else {
                setResults([])
                alert('Nao ha nenhum veiculo com a placa informada')
                setError(window.alert("Nao há nenhum veiculo com a placa informada."))
            }
        } catch (error) {
            console.error('Erro: ', error)

        }
    }

    return (
        <div>
            <div>
                <div className={styles.container}>
                    <div class='container-lg'>
                        <div className={styles.input}>
                            <h2>Informe a placa do veiculo:</h2>
                            <form className={styles.pesquisa} onSubmit={handleSearch}>
                                <label>
                                    <span>Placa:</span>
                                    <input type='text' value={query} onChange={(e) => setQuery(e.target.value)} required />
                                </label>
                                <button className={styles.buscar} type='submit' onClick={() => setFiltroAcesso(!filtroAcesso)}>{filtroAcesso ? 'Buscar' : 'Buscar'}</button>
                            </form>
                        </div>
                    </div>
                    
                </div>
                <div className={styles.table} id='printable'>
                        {filtroAcesso ?
                            <table className="table table-primary table-striped-columns" border="1">
                                <thead>
                                    {results.map(result => (
                                        <tr className={styles.head} key={result.id}>
                                            <th>Loja: {result.unidade}</th>
                                            <th>Placa: {result.placa} </th>
                                            <th>Marca: {result.marca}</th>
                                            <th>Modelo: {result.modelo}</th>
                                            <th>Cor: {result.cor}</th>
                                            <th>Data do Cadastro: {formatTimestamp(result.data_registro)}</th>
                                            <th>Data da Baixa: {result.data_alteracao ? formatTimestamp(result.data_alteracao) : "Carro fora do estoque válido"}</th>
                                        </tr>
                                    ))}
                                </thead>
                            </table> : null}
                    </div>
            </div>
        </div>
    )
}

export default SearchHistory

