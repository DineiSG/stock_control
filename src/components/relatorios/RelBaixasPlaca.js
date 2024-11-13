import React from 'react'
import { useState, useRef, } from 'react'
import styles from '../styles/Relatorios.module.css'


const RelBaixasPlaca = () => {

    const [busca, setBusca] = useState(false)
    const [query, setQuery] = useState()
    const [results, setResults] = useState([])
    const [error, setError] = useState('')

    //Tratando o foco da tela ao clicar o botao. Mudando para a tabela
    const tabelaRef = useRef(null)

    const handleButtonClick = () => {
        setBusca(!busca) //Alterando o estado da tabela

        setTimeout(() => {
            if (tabelaRef.current) {
                tabelaRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }
        }, 100)//Timeout para garantir que a tabela esteja visivel apos a renderização

    }

    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
    };

    /*Função que busca informações de um veiculo de acordo com a placa */
    const handleSearch = async (e) => {
        e.preventDefault();
        if (!query) return;

        const upperCaseQuery = query.toUpperCase();
        try {
            const response = await fetch(`http://localhost:8090/api/v1/baixas?placa=${upperCaseQuery}`)
            const data = await response.json()
            const filteredResults = data.filter(veiculo => veiculo.placa.toUpperCase() === upperCaseQuery);

            if (filteredResults.length > 0) {
                setResults(filteredResults)
                setError('')

            } else {
                setResults([])
                setError(window.alert("Nao há nenhuma baixa relacionada à placa informada."))
            }
        } catch (error) {
            window.alert("Erro ao buscar dados: ", error)
        }
    }

    return (
        <div>
            <div className={styles.container}>
                <div class="container-lg">
                    <h2 className={styles.title}>POR PLACA:</h2>
                    <form className={styles.pesquisa} onSubmit={handleSearch}>
                        <label>
                            <p>Placa:</p>
                            <input type='text' value={query} onChange={(e) => setQuery(e.target.value)} required />
                        </label>
                        <button className={styles.btn_buscar} type='submit' onClick={handleButtonClick}>
                            {busca ? 'Buscar' : 'Buscar'}</button>
                    </form>
                </div>
            </div>
            {busca ?
                <div ref={tabelaRef} className={styles.table}>

                    <br />
                    <table className="table table-secondary table-striped-columns" border="1">
                        <thead>
                            <tr>
                                <th>Placa</th>
                                <th>Marca</th>
                                <th>Modelo</th>
                                <th>Cor</th>
                                <th>Renavan</th>
                                <th>Loja</th>
                                <th>Data Baixa</th>
                                <th>Motivo</th>
                                <th>Observação</th>
                            </tr>
                        </thead>
                        <tbody>
                            {results.map(result => (
                                <tr key={result.id}>
                                    <td>{result.placa}</td>
                                    <td>{result.marca}</td>
                                    <td>{result.modelo}</td>
                                    <td>{result.cor}</td>
                                    <td>{result.renavan}</td>
                                    <td>{result.unidade}</td>
                                    <td>{formatTimestamp(result.data_registro)}</td>
                                    <td>{result.motivo}</td>
                                    <td>{result.observacoes}</td>
                                </tr>

                            ))}
                        </tbody>
                    </table>
                </div> : null}
        </div>
    )
}

export default RelBaixasPlaca
