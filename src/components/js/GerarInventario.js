import React from 'react'
import { useState, useEffect } from 'react'
import styles from '../styles/Inventario.module.css'

const GerarInventario = () => {
  const [filtroLoja, setFiltroLoja] = useState(false)
  const [query, setQuery] = useState()
  const [results, setResults] = useState([])
  const [setError] = useState('')
  const [lojas, setLojas] = useState([])
  const [randomNumber, setRandomNumber] = useState(null)


  /*Função que busca o estoque de acordo com a loja */
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query) return;

    const upperCaseQuery = query.toUpperCase();
    try {
      let response
      response = await fetch(`http://localhost:8090/api/veiculos`)//Buscando o estoque de todas as lojas
      response = await fetch(`http://localhost:8090/api/veiculos/unidade/${upperCaseQuery}`)//Buscando o estoque da loja de acordo com o nome      

      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status} ${response.statusText}`);
      }
      const data = await response.json()

      let filteredResults

      filteredResults = data.filter(veiculo => veiculo.unidade.toUpperCase() === upperCaseQuery && veiculo.unidade.trim() !== '' && veiculo.valor_meio_acesso !== '');//Buscando o estoque valido de uma loja
      filteredResults.sort((a, b) => a.unidade.localeCompare(b.unidade)) //Filtrando as lojas de ordem alfabetica

      if (filteredResults.length > 0) {
        setResults(filteredResults)
        setError('')
      } else {
        setResults([])
        setError(window.alert("Nao há estoque valido para a loja informada."))
        window.location.reload()
      }
    } catch (error) {
      console.error('Erro ao conectar ao servidor')
    }
  }
  useEffect(() => {
    if (filtroLoja && results.length > 0) {
      const generatedNumber = Math.floor(Math.random() * 1000000); // Gera um número aleatório
      setRandomNumber(generatedNumber)

    }
  }, [filtroLoja, results]);

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

  const handleSubmit = async () => {

    const formatTimestamp = (date) => {
      const pad = (num, size) => ('000' + num).slice(size * -1);
      const offset = -date.getTimezoneOffset();
      const sign = offset >= 0 ? '+' : '-';
      const offsetHours = pad(Math.floor(Math.abs(offset) / 60), 2);
      const offsetMinutes = pad(Math.abs(offset) % 60, 2);
      const dateString = date.getFullYear() + '-' +
        pad(date.getMonth() + 1, 2) + '-' +
        pad(date.getDate(), 2) + 'T' +
        pad(date.getHours(), 2) + ':' +
        pad(date.getMinutes(), 2) + ':' +
        pad(date.getSeconds(), 2) + '.' +
        pad(date.getMilliseconds(), 5) +
        sign + offsetHours + ':' + offsetMinutes
      return dateString;
    };

    const dataRegistro = formatTimestamp(new Date());

    const dataToSend = results.map(result => ({
      idInventario: randomNumber,
      unidade: result.unidade,
      marca: result.marca,
      modelo: result.modelo,
      cor: result.cor,
      renavan: result.renavan,
      placa: result.placa,
      data_registro: dataRegistro
    }))

    
      try {
        const response = await fetch('http://localhost:8090/api/inventario', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dataToSend),
        });

        if (!response.ok) {
          throw new Error('Erro ao enviar dados ao banco de dados');
        }
        console.log('Dados enviados com sucesso.');
        window.alert("Listagem salva com sucesso.")
        window.location.reload()
      } catch (error) {
        console.error('Erro:', error);
      }
    
  }


  //Front End

  return (
    <div>
      <div class="container-lg">
        <div className={styles.input}>
          <h2 className={styles.title} >Selecione uma loja para gerar a listagem de inventario:</h2>
          <form className={styles.pesquisa} onSubmit={handleSearch}>
            <label>
              <span>Selecione uma loja:</span>
              <select value={query} onChange={(e) => setQuery(e.target.value)} required>
                <option value=""></option>
                {lojas.map((loja) => (
                  <option key={loja.id} value={loja.descricao}>
                    {loja.descricao}
                  </option>
                ))}
              </select>
            </label>
            <button className={styles.buscar} type='submit' onClick={() => setFiltroLoja(!filtroLoja)} >{filtroLoja ? 'Nova Listagem' : 'Gerar Listagem Para Inventario'}</button>
          </form>
          <br />
          <p className={styles.p_aviso}>Copie o <strong>Código do Inventário</strong> pois será necessario na hora de buscar a listagem e lançar o resultado. </p>
        </div >
      </div>
      <div className={styles.table} id='printable'>
        {filtroLoja && randomNumber !== null ? (
          <>
            <button className={styles.savelist} type='submit' onClick={handleSubmit}>Salvar Listagem</button>
            <table className="table table-primary table-striped-columns" border="1">
              <thead>
                <tr>
                  <th>ID Inventario</th>
                  <th>Loja</th>
                  <th>Marca</th>
                  <th>Modelo</th>
                  <th>Cor</th>
                  <th>Renavan</th>
                  <th>Placa</th>
                  <th>Conferencia</th>
                  <th>Observação</th>
                </tr>
              </thead>
              <tbody>
                {results.map(result => (
                  <tr key={result.id}>
                    <td>{randomNumber}</td>
                    <td>{result.unidade}</td>
                    <td>{result.marca}</td>
                    <td>{result.modelo}</td>
                    <td>{result.cor}</td>
                    <td>{result.renavan}</td>
                    <td>{result.placa}</td>
                    <td></td>
                    <td></td>
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

export default GerarInventario
