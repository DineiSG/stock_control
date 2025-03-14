import { useState, useRef } from 'react'
import styles from '../styles/Relatorios.module.css'

const SearchLibMotivo = () => {
    const [filtroLoja, setFiltroLoja] = useState(false)
    const [query, setQuery] = useState()
    const [results, setResults] = useState([])
    const [setError] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [qtdItems, setQtdItems] = useState([50])

    const itemsPerPage = (e) => {
        setQtdItems(e.target.value)
    }

    //Tratando o foco da tela ao clicar o botao. Mudando para a tabela
    const tabelaRef = useRef(null)

    const handleButtonClick = () => {
        setFiltroLoja(!filtroLoja) //Alterando o estado da tabela

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
            let response


            if (upperCaseQuery === 'TODAS') {
                response = await fetch(`http://localhost:8090/api/v1/liberacoes`)//Buscando o estoque de todas as lojas

            } else if (upperCaseQuery === 'VENDA' || 'DEVOLUÇÃO' || 'TRANSFERENCIA' || 'MANUTENÇÃO') {
                response = await fetch(`http://localhost:8090/api/v1/liberacoes?motivo=${upperCaseQuery}`)//Buscando o estoque da loja de acordo com o nome
            }

            const data = await response.json()

            let filteredResults
            if (upperCaseQuery === 'TODAS') {
                filteredResults = data.filter(baixa => baixa.unidade && baixa.unidade.trim() !== '')//Buscandoas baixas de todas as lojas
                filteredResults.sort((a, b) => a.unidade.localeCompare(b.unidade)) //Filtrando as lojas de ordem alfabetica
            } else {
                filteredResults = data.filter(baixa => baixa.motivo.toUpperCase() === upperCaseQuery && baixa.motivo.trim() !== '')//Buscando o estoque valido de uma loja
            }

            if (filteredResults.length > 0) {
                setResults(filteredResults)
                setError('')
            } else {
                setResults([])
                setError(window.alert("Nao há nenhuma liberação relacionada ao motivo informado."))
                window.location.reload()
            }
        } catch (error) {
            console.error('Erro ao conectar ao servidor')
        }
    }

    //Calculando a quantidade de itens para exibir
    const indexOfLastItem = currentPage * qtdItems
    const indexOfFirstItem = indexOfLastItem - qtdItems
    const currentItems = results.slice(indexOfFirstItem, indexOfLastItem)

    //Gera botoes de paginaçao
    const totalPages = Math.ceil(results.length / qtdItems)
    const paginationButtons = Array.from({ length: totalPages }, (_, index) => (
        <button
            key={index + 1}
            className={styles.btn_paginacao}
            onClick={() => setCurrentPage(index + 1)}
            disabled={currentPage === index + 1}
        >
            {index + 1}
        </button>
    ))

    return (
        <div>
            <div class="container-md">
            <div className={styles.container}>
                    <h2 className={styles.title}>POR MOTIVO:</h2>
                    <form className={styles.pesquisa} onSubmit={handleSearch}>
                        <label>
                            <p>Selecione um motivo:</p>
                            <select value={query} onChange={(e) => setQuery(e.target.value)} required>
                                <option value=""></option>
                                <option value='TODAS'>TODAS AS LIBERAÇÕES</option>
                                <option value='VENDA'>VENDA</option>
                                <option value='TRANSFERENCIA'>TRANSFERENCIA</option>
                                <option value='DEVOLUÇÃO'>DEVOLUÇÃO</option>
                                <option value='MANUTENÇÃO'>MANUTENÇÃO</option>
                            </select>
                        </label>
                        <button className={styles.btn_buscar} type='submit' onClick={handleButtonClick}>{filtroLoja ? 'Buscar' : 'Buscar'}</button>
                    </form>
                </div>

            </div>
            <div className={styles.table} id='printable'>
                {filtroLoja ? (
                    <>
                        <div ref={tabelaRef}>
                            <p className={styles.txt_title} > LIBERAÇÕES REALIZADAS </p>
                            <div className={styles.selectQtd}>
                                <span style={{ color: 'black' }} >Selecione a quantidade de itens a ser exibido por pagina:</span>
                                <select value={qtdItems} name="cars" id="cars" onChange={(e) => setQtdItems(e.target.value)}>
                                    <option value="50">50</option>
                                    <option value="100">100</option>
                                    <option value="500">500</option>
                                    <option value="10000">TODOS</option>
                                </select>
                            </div>
                            <div className={styles.paginacao} ><span aria-hidden="true" style={{ color: 'black' }}>Página: {paginationButtons}</span></div>
                            <table className="table table-secondary table-striped-columns" border="1">
                                <thead>
                                    <tr>
                                        <th>Motivo</th>
                                        <th>Loja</th>
                                        <th>Marca</th>
                                        <th>Modelo</th>
                                        <th>Cor</th>
                                        <th>Placa</th>
                                        <th>Data</th>
                                        <th>Observação</th>
                                    </tr>
                                </thead>
                                {currentItems.map((result) => (
                                    <tbody>
                                        <tr key={result.id}>
                                            <td>{result.motivo}</td>
                                            <td>{result.unidade}</td>
                                            <td>{result.marca}</td>
                                            <td>{result.modelo}</td>
                                            <td>{result.cor}</td>
                                            <td>{result.placa}</td>
                                            <td>{formatTimestamp(result.dataRegistro)}</td>
                                            <td>{result.observacoes}</td>
                                        </tr>
                                    </tbody>
                                ))}
                            </table>
                            <p className={styles.quantidade}>TOTAL DE BAIXAS: {results.length}</p>
                        </div>
                    </>
                ) : null}
            </div>


        </div>
    )
}

export default SearchLibMotivo
