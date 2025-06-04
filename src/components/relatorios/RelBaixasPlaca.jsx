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

    /*Função que trata do retorno de data */
    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
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

        setQuery('')// Limpa o campo de pesquisa após a busca
        setBusca(busca) // Atualiza o estado para exibir a tabela
    }

    return (
        <div>
            <div className={styles.container}>
                <div class="container-lg">
                    {!busca ? <h2 className={styles.title}>POR PLACA:</h2> : <h2 className={styles.title}>RELATÓRIO DE BAIXAS POR PLACA GERADO</h2>}
                    <form className={styles.pesquisa} onSubmit={handleSearch}>
                        <label>
                            {!busca ? <p>Placa:</p> : null}
                            {!busca ? <input type='text' value={query} onChange={(e) => setQuery(e.target.value)} required />: null}
                        </label>
                        <button className={styles.btn_buscar} type='submit' onClick={handleButtonClick}> {busca ? 'Novo Relatório' : 'Gerar Relatório'}</button>
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
                                    <td>{result.unidade}</td>
                                    <td>{formatTimestamp(result.dataRegistro)}</td>
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
