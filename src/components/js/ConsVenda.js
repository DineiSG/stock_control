import { useState, useRef } from 'react'
import styles from '../styles/Lojista.module.css'

const ConsVenda = () => {

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
      const response = await fetch(`http://localhost:8090/api/v1/vendas?placa=${upperCaseQuery}`)
      const data = await response.json()
      const filteredResults = data.filter(veiculo => veiculo.placa.toUpperCase() === upperCaseQuery);
      if (filteredResults.length > 0) {
        setResults(filteredResults)
        setError('')

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
      <h1><img width="70" height="70" src="https://img.icons8.com/3d-fluency/94/money.png" alt="search" /> Relatório de Venda</h1>
      <div className={styles.cont}>
        <div class='container-lg'>
          <div className={styles.p}>
            <h2 className={styles.title} >INFORME A PLACA DO VEÍCULO PARA CONSULTAR SUA VENDA:</h2>
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
      <div className={styles.table} id='printable'>
        {results && results.map(result => (

          <div ref={tabelaRef} key={result.id}>
            <h2 className={styles.title2} >RELATÓRIO DA VENDA</h2>
            <hr />
            <br />
            <h2 className={styles.sub_title2} >DADOS DO VEÍCULO:</h2>
            <label className={styles.item}>
              <span>Placa:</span>
              <p className={styles.dados}>{result.placa}</p>
            </label>
            <label className={styles.item}>
              <span>Marca:</span>
              <p className={styles.dados}>{result.marca}</p>
            </label>
            <label className={styles.item}>
              <span>Modelo:</span>
              <p className={styles.dados}>{result.modelo}</p>
            </label>
            <label className={styles.item}>
              <span>Cor:</span>
              <p className={styles.cor}>{result.cor}</p>
            </label>
            <label className={styles.item}>
              <span>Renavam:</span>
              <p className={styles.dados2}>{result.renavam} </p>
            </label>
            <label className={styles.item}>
              <span>Loja:</span>
              <p className={styles.dados}>{result.unidade} </p>
            </label>
            <label className={styles.item}>
            <span>Data da Comunicação da Venda:</span>
              <p className={styles.dados}>{formatTimestamp(result.dataRegistro)} </p>
            </label>
            <br/>
            <hr />
            <h2 className={styles.sub_title2} >DADOS DA NEGOCIAÇÃO:</h2>
            <label className={styles.item}>
              <span>Vendedor:</span>
              <p className={styles.dados3} >{result.vendedor} </p>
            </label>
            <label className={styles.item}>
              <span>Comprador:</span>
              <p className={styles.dados3} >{result.comprador} </p>
            </label>
            <label className={styles.item}>
              <span>Forma de Negociação:</span>
              <p className={styles.dados4} >{result.tipoVenda} </p>
            </label>
            <label className={styles.item}>
              <span>Instituição  Financeira:</span>
              <p className={styles.dados4}>{result.instituicao} </p>
            </label>
            <br />
            <label className={styles.item}>
              <span>Valor Tabela FIPE R$:</span>
              <p className={styles.dados4} >{result.valorFipe} </p>
            </label>
            <label className={styles.item}>
              <span>Valor de Venda R$:</span>
              <p className={styles.dados4}>{result.valorVenda} </p>
            </label>
            <label className={styles.item}>
              <span>Valor Financiado R$:</span>
              <p className={styles.dados4}>{result.valorFinanciamento} </p>
            </label>
            <label className={styles.item}>
              <span>Valor de Entrada:</span>
              <p className={styles.dados4} >{result.valorEntrada} </p>
            </label>
            <label className={styles.item}>
              <span>Observações:</span>
              <p type='text' className={styles.obs}>{result.observacoes} </p>
            </label>
          </div>
        ))}
      </div>

    </div>

  )


}

export default ConsVenda
