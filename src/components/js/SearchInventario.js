import React from 'react'
import { useState, useEffect } from 'react'
import styles from '../styles/Inventario.module.css'

const SearchInventario = () => {
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


  /*Função que busca o estoque de acordo com a loja */
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query) return;

    const upperCaseQuery = query.toUpperCase();
    try {
      let response

      if (upperCaseQuery === 'TODOS') {
        response = await fetch(`http://localhost:8090/api/resultado`)//Buscando todos os inventarios
      } else {
        response = await fetch(`http://localhost:8090/api/resultado?unidade=${upperCaseQuery}`)//Buscando o inventario de acordo com a loja selecionada
      }

      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status} ${response.statusText}`);
      }
      const data = await response.json()

      let filteredResults
      if (upperCaseQuery === 'TODOS') {
        filteredResults = data.filter(resultado => resultado.unidade && resultado.unidade.trim() !== '')//Buscando o estoque valido de todas as lojas
        filteredResults.sort((a, b) => a.unidade.localeCompare(b.unidade)) //Filtrando as lojas de ordem alfabetica
      } else {
        filteredResults = data.filter(resultado => resultado.unidade.toUpperCase() === upperCaseQuery && resultado.unidade.trim() !== '');//Buscando o estoque valido de uma loja
      }

      if (filteredResults.length > 0) {
        setResults(filteredResults)
        setError('')
      } else {
        setResults([])
        setError(window.alert("Nao há inventario encerrado da loja selecionada."))
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


  return (
    <div>
      <div class="container-lg">
        <div className={styles.container}>
          <div className={styles.input}>
            <h2>Selecione uma loja para buscar por um resultado de inventário:</h2>
            <form className={styles.pesquisa} onSubmit={handleSearch}>
              <label>
                <span>Selecione uma loja:</span>
                <select value={query} onChange={(e) => setQuery(e.target.value)} required>
                  <option value="">SELECIONE UMA LOJA</option>
                  <option value='TODOS'>TODOS</option>
                  {lojas.map((loja) => (
                    <option key={loja.id} value={loja.descricao}>
                      {loja.descricao}
                    </option>
                  ))}
                </select>
              </label>
              <button className={styles.buscar} type='submit' onClick={() => setFiltroLoja(!filtroLoja)}>{filtroLoja ? 'Buscar' : 'Buscar'}</button>
            </form>
            <div className={styles.search_table}>
            {filtroLoja ? (
              <>
                <table className="table table-primary table-striped-columns" border="1">
                  <thead>
                    {results.map(result => (
                      <tr key={result.id}>
                        <th>Cod. Inventário: {result.idInventario} </th>
                        <th>Loja: {result.unidade}</th>
                        <th>Data de Abertura: {formatTimestamp(result.data_abertura)}</th>
                        <th>Data de Fechamento: {formatTimestamp(result.data_fechamento)}</th>
                        <th>Quantidade de Divergencias: {result.qtd_divergencias}</th>
                        <th>Acuracidade: {result.acuracidade}</th>
                        <th>Observaçoes: {result.observacoes}</th>
                      </tr>))}
                  </thead>
                </table>
              </>
            ) : null}
            </div>
          </div >
        </div>
      </div>
    </div>
  )
}

export default SearchInventario
