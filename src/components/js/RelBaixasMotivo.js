import { useState} from 'react'
import styles from '../styles/Relatorios.module.css'
import * as XLSX from 'xlsx'

const RelBaixasMotivo = () => {

    const [filtroLoja, setFiltroLoja] = useState(false)
    const [query, setQuery] = useState()
    const [results, setResults] = useState([])
    const [setError] = useState('')


    /*Função que trata do retorno de data */
    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
    };

    // Função que calcula a quantidade de dias em estoque
    const calculateDaysInStock = (data_registro) => {
        const currentDate = new Date()
        const registrationDateobject = new Date(data_registro)
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
            let response

            
            if (upperCaseQuery === 'TODAS') {
                response = await fetch(`http://localhost:8090/api/baixas`)//Buscando o estoque de todas as lojas
            } else if (upperCaseQuery === 'VENDA' || 'DEVOLUÇAO' || 'TRANSFERENCIA') {
                response = await fetch(`http://localhost:8090/api/baixas?motivo=${upperCaseQuery}`)//Buscando o estoque da loja de acordo com o nome
            }

            const data = await response.json()

            let filteredResults
            if (upperCaseQuery === 'TODAS') {
                filteredResults = data.filter(baixa => baixa.unidade && baixa.unidade.trim() !== '')//Buscandoas baixas de todas as lojas
                filteredResults.sort((a, b) => a.unidade.localeCompare(b.unidade)) //Filtrando as lojas de ordem alfabetica
            } else {
                filteredResults = data.filter(baixa => baixa.motivo.toUpperCase() === upperCaseQuery && baixa.motivo.trim() !== '' )//Buscando o estoque valido de uma loja
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

    //Função responsavel por gerar a planilha de excel
    const generateExcel = () => {
        const formattedData = results.map(item => ({
            Cod: item.id_unidade,
            Loja: item.unidade,
            Data_Cadastro: formatTimestamp(item.data_registro),
            Dias_Em_Estoque: calculateDaysInStock(item.data_registro),
            Marca: item.marca,
            Modelo: item.modelo,
            Ano_de_Fabricaçao: item.ano,
            Cor: item.cor,
            Renavan: item.renavan,
            Placa: item.placa,
            Num_Tag: item.valor_meio_acesso


        }))

        const worksheet = XLSX.utils.json_to_sheet(formattedData)
        const workbook = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(workbook, worksheet, "Data")
        XLSX.writeFile(workbook, "Relatorio de Estoque.xlsx")
    }

    return (
        <div>
            <div className={styles.container}>
                <div className={styles.input}>
                    <h2>Por motivo:</h2>
                    <form className={styles.pesquisa} onSubmit={handleSearch}>
                        <label>
                            <span>Selecione um motivo:</span>
                            <select value={query} onChange={(e) => setQuery(e.target.value)} required>
                                <option value="">SELECIONE UM MOTIVO</option>
                                <option value='TODAS'>TODAS AS BAIXAS</option>
                                <option value='VENDA'>VENDA</option>
                                <option value='TROCA'>TROCA</option>
                                <option value='DEVOLUCAO'>DEVOLUÇAO</option>
                            </select>
                        </label>
                        <button className={styles.buscar} type='submit' onClick={() => setFiltroLoja(!filtroLoja)}>{filtroLoja ? 'Buscar' : 'Buscar'}</button>
                    </form>
                </div>
                
            </div>
            <div className={styles.table} id='printable'>
                {filtroLoja ? (
                    <>
                        <p className={styles.quantidade}>TOTAL DE BAIXAS: {results.length}</p>
                        <table className="table table-primary table-striped-columns" border="1">
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
                    </>
                ) : null}
            </div>
            

        </div>
    )
}

export default RelBaixasMotivo
