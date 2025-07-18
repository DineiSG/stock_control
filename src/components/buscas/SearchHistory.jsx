import React from 'react'
import { useState, useRef } from 'react'
import styles from '../styles/Relatorios.module.css'

const SearchHistory = () => {
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

    /*Função que busca o estoque de acordo com a loja */
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
                setError(window.alert("Veículo ainda disponível para venda."))

            }
        } catch (error) {
            console.error('Erro: ', error)
            
        }
        setQuery('') // Limpa o campo de pesquisa após a busca
    }

    return (
        <div>
            <div class='container-md'>
                    <div className={styles.container}>
                        <div className={styles.input}>
                            {!filtroAcesso?  <h2 className={styles.title} >INFORME A PLACA DO VEÍCULO:</h2> : <h2 className={styles.title} >RELATÓRIO DE HISTÓRICO DO VEÍCULO GERADO</h2>}
                            <form className={styles.pesquisa} onSubmit={handleSearch}>
                                <label>
                                    {!filtroAcesso? <p>Placa:</p> : null}
                                    {!filtroAcesso? <input type='text' value={query} onChange={(e) => setQuery(e.target.value)} required /> : null} 
                                </label>
                                <button className={styles.btn_buscar} type='submit' onClick={handleButtonClick}>{filtroAcesso ? 'Novo Relatório' : 'Gerar Relatório'}</button>
                            </form>
                        </div>
                    </div>
            </div>
                <div ref={tabelaRef} className={styles.table_h} id='printable'>
                    {filtroAcesso ?
                        <table className="table table-secondary table-striped-columns" border="1">
                            <thead>
                                {results.map(result => (
                                    <tr className={styles.head} key={result.id}>
                                        <th className={styles.table_title} > HISTÓRICO DO VEÍCULO </th>
                                        <th>Loja: {result.unidade}</th>
                                        <th>Placa: {result.placa} </th>
                                        <th>Marca: {result.marca}</th>
                                        <th>Modelo: {result.modelo}</th>
                                        <th>Cor: {result.cor}</th>
                                        <th>Data da Baixa: {result.dataRegistro ? formatTimestamp(result.dataRegistro) : "CARRO AINDA DISPONIVEL PARA VENDA"}</th>
                                        <th>Observações: {result.observacoes}</th>
                                    </tr>
                                ))}
                            </thead>
                        </table> : null}
                </div>
        </div>
    )
}

export default SearchHistory

