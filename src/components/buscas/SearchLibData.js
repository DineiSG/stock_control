import { useState, useRef } from 'react'
import styles from '../styles/Liberar.module.css'

const SearchLibData = () => {
    const [busca, setBusca] = useState(false)
    const [results, setResults] = useState([])
    const [dataRegistro, setDataRegistro] = useState('')
    const [error, setError] = useState('')

    //Tratando o foco da tela ao clicar o botao. Mudando para a tabela
    const tabelaRef = useRef(null)

    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
    };

    /*Função que busca informações de uma liberaçao de acordo com a data */
    const fetchBaixas = async (data) => {
        if (!data) {
            window.alert("Por favor, informe uma data.");
            return;
        }

        try {
            const response = await fetch(`http://localhost:8090/api/v1/liberacoes`)

            if (!response.ok) {
                console.error('Erro na resposta do servidor:', response.statusText);
                setError('Erro na resposta do servidor');
                return;
            }

            const dataJson = await response.json()

            const filteredResults = dataJson.filter((baixa) => {
                if (!baixa.dataRegistro) return false;

                const dataBaixa = new Date(baixa.dataRegistro).toISOString().split("T")[0]

                return dataBaixa === data

            })

            console.log("Data informada:", data);

            if (filteredResults.length > 0) {
                setResults(filteredResults)
                setError('')

            } else {
                window.alert("Nao há nenhuma baixa relacionada à data informada.")
                setResults([])

            }

        } catch (error) {
            window.alert("Erro ao buscar dados: ", error)
        }
    }

    const handleButtonClick = async (e) => {
        e.preventDefault(); // Impede o envio do formulário
        setBusca(true);
        await fetchBaixas(dataRegistro)

        setTimeout(() => {
            if (tabelaRef.current) {
                tabelaRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }
        }, 100)//Timeout para garantir que a tabela esteja visivel apos a renderização

    }


    return (
        <div>
            <div class="container-md">
                <div className={styles.container}>
                    <h2 className={styles.title}>POR DATA:</h2>
                    <form className={styles.pesquisa}>
                        <label>
                            <p>Informe a Data:</p>
                            <input className={styles.date} type="date" value={dataRegistro} onChange={e => setDataRegistro(e.target.value)} />
                        </label>
                        <button className={styles.btn_buscar} type='submit' onClick={handleButtonClick}>Buscar</button>
                    </form>
                </div>
            </div>
            {results.length > 0 && (
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
                                <th>Data Liberação</th>
                                <th>Motivo</th>
                                <th>Observação</th>
                            </tr>
                        </thead>
                        <tbody>
                            {results.map(result => (
                                <tr key={result.id || result.placa}>
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
                </div>)}
        </div>
    )
}

export default SearchLibData
