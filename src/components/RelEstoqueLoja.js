/*Este componente é responsável por buscar os veiculos e gerar os relatorios em excel */
import { useState, useEffect } from 'react'
import styles from './Relatorios.module.css'
import * as XLSX from 'xlsx'



const RelEstoqueLoja = () => {

  const [filtroLoja, setFiltroLoja] = useState(false)
  const [query, setQuery] = useState()
  const [results, setResults] = useState([])
  const [setError] = useState('')
  const [lojas, setLojas] = useState([])

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

    if (upperCaseQuery === 'ESTOQUE GERAL'){
      response = await fetch(`http://localhost:8090/api/veiculos`)//Buscando o estoque de todas as lojas
    }else{
      response = await fetch(`http://localhost:8090/api/veiculos/unidade/${upperCaseQuery}`)//Buscando o estoque da loja de acordo com o nome
    }
      
      const data = await response.json()

      let filteredResults
      if (upperCaseQuery==='ESTOQUE GERAL'){
        filteredResults = data.filter(veiculo => veiculo.unidade && veiculo.unidade.trim()!== '')//Buscando o estoque valido de todas as lojas
        filteredResults.sort((a,b)=>a.unidade.localeCompare(b.unidade)) //Filtrando as lojas de ordem alfabetica
      }else{
        filteredResults= data.filter(veiculo => veiculo.unidade.toUpperCase() === upperCaseQuery && veiculo.unidade.trim()!== '');//Buscando o estoque valido de uma loja
      }

      if (filteredResults.length > 0) {
        setResults(filteredResults)
        setError('')
      }else{
        setResults([])
        setError(window.alert("Nao há estoque valido para a loja informada."))
        window.location.reload()
      }
    } catch (error) {
      console.error('Erro ao conectar ao servidor')
    }
  }

  //Buscando as lojas para o select
  useEffect(() => {
    const fetchLojas = async () => {
      try {
        const response = await fetch(`http://localhost:8090/api/lojas`)
        const data = await response.json()
        console.log('Dados da API: ', data)
        if (Array.isArray(data)) {
          setLojas(data)
        } else {
          console.error('A resposta da API nao e um array', data)
        }
      } catch (error) {
        console.error('Erro ao buscar lojas: ', error)
      }
    }
    fetchLojas()
  }, [])

  /*Funçao para gerar o relatorio do Excel com as colunas que serao exibidas já definidas */
  const generateExcel = () => {
    const formattedData = results.map(item => ({
      Cod:item.id_unidade,
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
          <h2>Informe o nome da loja:</h2>
          <form className={styles.pesquisa} onSubmit={handleSearch}>
            <label>
              <span>Selecione uma loja:</span>
              <select value={query} onChange={(e) => setQuery(e.target.value)} required>
                <option value="">SELECIONE UMA LOJA</option>
                <option value='ESTOQUE GERAL'>ESTOQUE GERAL</option>
                {lojas.map((loja) => (
                  <option key={loja.id} value={loja.descricao}>
                    {loja.descricao}
                  </option>
                ))}
              </select>
            </label>
            <button className={styles.buscar} type='submit' onClick={() => setFiltroLoja(!filtroLoja)}>{filtroLoja ? 'Buscar' : 'Buscar'}</button>
          </form>
        </div >
      </div>
      <div className={styles.table} id='printable'>
        {filtroLoja ?
          <table className="table table-primary table-striped-columns" border="1">
            <thead>
              <tr>
                <th>Cod.</th>
                <th>Loja</th>
                <th>Data Cadastro</th>
                <th>Dias em Estoque</th>
                <th>Marca</th>
                <th>Modelo</th>
                <th>Cor</th>
                <th>Ano</th>
                <th>Renavan</th>
                <th>Placa</th>
                <th>Nº Tag</th>
              </tr>
            </thead>
            <tbody>
              {results.map(result => (
                <tr key={result.id}>
                  <td>{result.id_unidade}</td>
                  <td>{result.unidade}</td>
                  <td>{formatTimestamp(result.data_registro)}</td>
                  <td>{result.unidade ? calculateDaysInStock(result.data_registro) : '-'}</td>
                  <td>{result.marca}</td>
                  <td>{result.modelo}</td>
                  <td>{result.cor}</td>
                  <td>{result.ano}</td>
                  <td>{result.renavan}</td>
                  <td>{result.placa}</td>
                  <td>{result.valor_meio_acesso}</td>
                </tr>

              ))}
            </tbody>
          </table> : null}
      </div>
      <button className={styles.filtrar} onClick={generateExcel} disabled={results.length === 0}>Gerar Relatorio XLSX</button>

    </div>
  )
}

export default RelEstoqueLoja
