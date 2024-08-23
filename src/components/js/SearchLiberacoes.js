import React from 'react'
import { useState } from 'react'
import styles from '../styles/Liberar.module.css'

const SearchLiberacoes = () => {
    const [filtroAcesso, setFiltroAcesso] = useState(false)
    const [query, setQuery] = useState()
    const [results, setResults] = useState([])
    const [setError] = useState('')
    


    /*Função que trata do retorno de data */
    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
    };

    // Função que calcula a quantidade de dias em estoque
    const calculateDaysInStock = (dataRegistro) => {
        const currentDate = new Date()
        const registrationDateobject = new Date(dataRegistro)
        const differenceInMilliseconds = currentDate - registrationDateobject
        const differenceInDays = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24))
        return differenceInDays
    }

    /*Função que busca o estoque de acordo com a loja */
    const handleSearch = async (e) => {
        e.preventDefault();
        if (!query) return;

        const upperCaseQuery = query.toUpperCase();
        try {
            const response = await fetch(`http://localhost:8090/api/liberacoes?placa=${upperCaseQuery}`)
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
                <h1>Consultar Liberação <svg xmlns="http://www.w3.org/2000/svg" width="110" height="50" fill="rgba(89, 3, 110, 0.871)" class="bi bi-search" viewBox="0 0 16 16">
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                </svg></h1>
                <div className={styles.cont}>
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
                                            <th>Cod. Liberaçao: {result.id}</th>
                                            <th>Solicitante: {result.solicitante}</th>
                                            <th>Loja: {result.unidade}</th>
                                            <th>Placa: {result.placa} </th>
                                            <th>Marca: {result.marca}</th>
                                            <th>Modelo: {result.modelo}</th>
                                            <th>Cor: {result.cor}</th>
                                            <th>Data da Liberação: {formatTimestamp(result.dataRegistro)}</th>
                                            <th>Dias Desde a Liberação: {calculateDaysInStock(result.dataRegistro)}</th>
                                            <th>Motivo: {result.motivo}</th>
                                        </tr>
                                    ))}
                                </thead>
                            </table> : null}
                    </div>
            </div>
        </div>
    )
}

export default SearchLiberacoes
