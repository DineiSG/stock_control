import React from 'react'
import styles from '../styles/Relatorios.module.css'
import { useState, useRef  } from 'react';



const RelAcesso = () => {

  const [filtroAcesso, setFiltroAcesso] = useState(false)
  const [query, setQuery] = useState()
  const [results, setResults] = useState([])
  const [accessResult, setAccessResult] = useState([])
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
  

  /*Função que formata a data para exibi-la no frontend*/
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour:'2-digit', minute:'2-digit' });
  };

  // Função que calcula a quantidade de dias em estoque
  const calculateDaysInStock = (data_registro) => {
    const currentDate = new Date()
    const registrationDateobject = new Date(data_registro)
    const differenceInMilliseconds = currentDate - registrationDateobject
    const differenceInDays = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24))
    return differenceInDays
  }


  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query) return;

    const upperCaseQuery = query.toUpperCase();

    try {

      /*Buscando o veiculo de acordo com a placa*/
      const response = await fetch(`http://localhost:8090/api/v1/veiculos?placa=${upperCaseQuery}`)
      const data = await response.json()

      //Filtro que sera responsável por caso encontrar um veiculo com a placa informada 
      const filteredResults = data.filter(veiculo => veiculo.placa.toUpperCase() === upperCaseQuery);

      if (filteredResults.length > 0) {
        setResults(filteredResults)

        //Capturando o id do resultado da pesquisa e utilizando para buscar
        const idVeiculoAcessante = filteredResults[0].id
        const relatedDataResponse = await fetch(`http://localhost:8090/api/v1/acessos/historico/${idVeiculoAcessante}`)

        if (!relatedDataResponse.ok) {
          throw new Error('Erro ao buscar dados de acesso.')
        }

        const relatedData = await relatedDataResponse.json()
        setAccessResult(relatedData)
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
      <div className={styles.container}>
        <div class="container-sm" >
          <div className={styles.input}>
            <h2 className={styles.title}>INFORME A PLACA DO VEÍCULO</h2>
            <form className={styles.pesquisa} onSubmit={handleSearch}>
              <label>
                <p>Placa:</p>
                <input type='text' value={query} onChange={(e) => setQuery(e.target.value)} required />
              </label>
              <button className={styles.btn_buscar} type='submit' onClick={handleButtonClick}>{filtroAcesso ? 'Buscar' : 'Buscar'}</button>
            </form>
          </div>
        </div>
      </div>  
        <div ref={tabelaRef}  className={styles.table} id='printable'>
          {filtroAcesso ?
            <table className="table table-secondary table-striped-columns" border="1">
              <thead>
                {results.map(result => (
                  <tr className={styles.head} key={result.id}>
                    <th className={styles.table_title} >RELATORIO DE ACESSO DE VEÍCULO</th>
                    <th>Cod. Veiculo: {result.id}</th>
                    <th>Placa: {result.placa} </th>
                    <th>Loja: {result.unidade}</th>
                    <th>Marca: {result.marca}</th>
                    <th>Modelo: {result.modelo}</th>
                    <th>Cor: {result.cor}</th>
                    <th>Data Cadastro: {formatTimestamp(result.data_registro)}</th>
                    <th>Dias em Estoque: {calculateDaysInStock(result.data_registro)}</th>
                    <th>Status: {result.veiculo_status}</th>
                  </tr>
                ))}
              </thead>
            </table> : null}
          {filtroAcesso ?
            <table className="table table-secondary table-striped-columns" border="1">
              <thead>
                <tr>
                  <th>Data e Hora da Movimentaçao</th>
                  <th>Sentido: E = Entrada S = Saída</th>
                </tr>
              </thead>
              <tbody>
                {accessResult.map(result => (
                  <tr key={result.idVeiculoAcessante}>
                    <td>{formatTimestamp(result.data_movimentacao)}</td>
                    <td>{result.sentido}</td>
                  </tr>
                ))}

              </tbody>
            </table> : null}
        </div>
      
    </div>
  )

}

export default RelAcesso
