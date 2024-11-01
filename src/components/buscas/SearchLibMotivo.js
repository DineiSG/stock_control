import { useState, useRef } from 'react'
import styles from '../styles/Relatorios.module.css'

const SearchLibMotivo = () => {
    const [filtroLoja, setFiltroLoja] = useState(false)
    const [query, setQuery] = useState()
    const [results, setResults] = useState([])
    const [setError] = useState('')

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
        return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
    };


    /*Função que busca o estoque de acordo com a loja */
    const handleSearch = async (e) => {
        e.preventDefault();
        if (!query) return;

        const upperCaseQuery = query.toUpperCase();
        try {
            let response


            if (upperCaseQuery === 'TODAS') {
                response = await fetch(`http://localhost:8090/api/v1/baixas`)//Buscando o estoque de todas as lojas
                
            } else if (upperCaseQuery === 'VENDA' || 'DEVOLUÇAO' || 'TRANSFERENCIA'|| 'CORRECAO') {
                response = await fetch(`http://localhost:8090/api/v1/baixas?motivo=${upperCaseQuery}`)//Buscando o estoque da loja de acordo com o nome
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
                setError(window.alert("Nao há nenhuma baixa relacionada ao motivo informado."))
                window.location.reload()
            }
        } catch (error) {
            console.error('Erro ao conectar ao servidor')
        }
    }


    return (
        <div>
            <div className={styles.container}>
                <div className={styles.input}>
                    <h2 className={styles.title}>POR MOTIVO:</h2>
                    <form className={styles.pesquisa} onSubmit={handleSearch}>
                        <label>
                            <p>Selecione um motivo:</p>
                            <select value={query} onChange={(e) => setQuery(e.target.value)} required>
                                <option value=""></option>
                                <option value='TODAS'>TODAS AS BAIXAS</option>
                                <option value='VENDA'>VENDA</option>
                                <option value='TROCA'>TROCA</option>
                                <option value='DEVOLUCAO'>DEVOLUÇAO</option>
                                <option value='CORRECAO'>CORREÇÃO DE ESTOQUE</option>
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
                            
                            <p className={styles.txt_title} > BAIXAS REALIZADAS </p>
                            <table className="table table-secondary table-striped-columns" border="1">
                                <thead>
                                    <tr>
                                        <th>Motivo</th>
                                        <th>Loja</th>
                                        <th>Marca</th>
                                        <th>Modelo</th>
                                        <th>Cor</th>
                                        <th>Renavan</th>
                                        <th>Placa</th>
                                        <th>Data Baixa</th>
                                        <th>Nº Tag</th>
                                        <th>Observação</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {results.map(result => (
                                        <tr key={result.id}>
                                            <td>{result.motivo}</td>
                                            <td>{result.unidade}</td>
                                            <td>{result.marca}</td>
                                            <td>{result.modelo}</td>
                                            <td>{result.cor}</td>
                                            <td>{result.renavan}</td>
                                            <td>{result.placa}</td>
                                            <td>{formatTimestamp(result.data_registro)}</td>
                                            <td>{result.valor_meio_acesso}</td>
                                            <td>{result.observacoes}</td>
                                        </tr>
                                    ))}
                                </tbody>
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
