import React from 'react'
import { useState, useRef } from 'react'
import styles from '../styles/Liberar.module.css'

const SearchLiberacoes = () => {
    const [filtroAcesso, setFiltroAcesso] = useState(false)
    const [query, setQuery] = useState()
    const [results, setResults] = useState([])
    const [setError] = useState('')

    //Tratando o foco da tela ao clicar o botao. Mudando para a tabela
    const tabelaRef = useRef(null)

    const handleButtonClick = () => {
        setFiltroAcesso(!filtroAcesso) //Alterando o estado da tabela

        setTimeout(() => {
            if (tabelaRef.current) {
                tabelaRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }
        }, 100)//Timeout para garantir que a tabela esteja visivel apos a renderização

    }

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

    /*Função que busca o veiculo de acordo com a placa */
    const handleSearch = async (e) => {
        e.preventDefault();
        if (!query) return;

        const upperCaseQuery = query.toUpperCase();
        try {
            const response = await fetch(`http://localhost:8090/api/v1/liberacoes?placa=${upperCaseQuery}`)
            const data = await response.json()
            const filteredResults = data.filter(veiculo => veiculo.placa.toUpperCase() === upperCaseQuery);
            if (filteredResults.length > 0) {
                setResults(filteredResults)
             

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
            <div class="container-md">
                <div className={styles.container}>
                    <h2 className={styles.title} >INFORME A PLACA DO VEÍCULO:</h2>
                    <form className={styles.pesquisa} onSubmit={handleSearch}>
                        <label>
                            <p>Placa:</p>
                            <input type='text' value={query} onChange={(e) => setQuery(e.target.value)} required />
                        </label>
                        <button className={styles.btn_buscar} type='submit' onClick={handleButtonClick}>{filtroAcesso ? 'Buscar' : 'Buscar'}</button>
                    </form>
                </div>
            </div>
            <div className={styles.table} id='printable'>
                {filtroAcesso ?
                    <table ref={tabelaRef} className="table table-secondary table-striped-columns" border="1">
                        <thead>
                            {results.map(result => (
                                <tr className={styles.head} key={result.id}>
                                    <th className={styles.table_title} >RELATÓRIO DE LIBERAÇÃO DE VEÍCULO</th>
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
    )
}

export default SearchLiberacoes
