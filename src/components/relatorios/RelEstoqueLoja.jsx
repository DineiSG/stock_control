/*Este componente é responsável por buscar os veiculos e gerar os relatorios em excel */
import { useState, useEffect, useRef } from "react";
import styles from "../styles/Relatorios.module.css";

const RelEstoqueLoja = () => {
  const [filtroLoja, setFiltroLoja] = useState(false);
  const [query, setQuery] = useState();
  const [results, setResults] = useState([]);
  const [setError] = useState("");
  const [lojas, setLojas] = useState([]);
  const [currentPage, setCurrentPage] = useState(1)
  const [qtdItems, setQtdItems] = useState([5])

  const itemsPerPage = (e) => {
    setQtdItems(e.target.value)
  }


  //Tratando o foco da tela ao clicar o botao. Mudando para a tabela
  const tabelaRef = useRef(null);



  const handleButtonClick = () => {
    setFiltroLoja(!filtroLoja); //Alterando o estado da tabela

    setTimeout(() => {
      if (tabelaRef.current) {
        tabelaRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 100); //Timeout para garantir que a tabela esteja visivel apos a renderização
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  // Função que calcula a quantidade de dias em estoque
  const calculateDaysInStock = (data_registro) => {
    const currentDate = new Date();
    const registrationDateobject = new Date(data_registro);
    const differenceInMilliseconds = currentDate - registrationDateobject;
    const differenceInDays = Math.floor(
      differenceInMilliseconds / (1000 * 60 * 60 * 24)
    );
    return differenceInDays;
  };

  /*Função que busca o estoque de acordo com a loja */
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query) return;

    const upperCaseQuery = query.toUpperCase();
    try {
      let response;

      if (upperCaseQuery === "ESTOQUE GERAL") {
        response = await fetch(`http://localhost:8090/api/v1/veiculos`); //Buscando o estoque de todas as lojas
      } else {
        response = await fetch(`http://localhost:8090/api/v1/veiculos/unidade/${upperCaseQuery}`); //Buscando o estoque da loja de acordo com o nome
      }

      if (!response.ok) {
        throw new Error(
          `Erro na requisição: ${response.status} ${response.statusText}`
        );
      }
      const data = await response.json();

      let filteredResults;
      if (upperCaseQuery === "ESTOQUE GERAL") {
        filteredResults = data.filter((veiculo) => veiculo.unidade && veiculo.unidade.trim() !== "" ); //Buscando o estoque valido de todas as lojas
        filteredResults.sort((a, b) => a.unidade.localeCompare(b.unidade)); //Filtrando as lojas de ordem alfabetica
      } else {
        filteredResults = data.filter((veiculo) => veiculo.unidade.toUpperCase() === upperCaseQuery && veiculo.unidade.trim()); //Buscando o estoque valido de uma loja
      }

      if (filteredResults.length > 0) {
        setResults(filteredResults);
        setCurrentPage(1)
      } else {
        setResults([]);
        setError(window.alert("Nao há estoque valido para a loja informada."));
        window.location.reload();
      }
    } catch (error) {
      console.error("Erro ao conectar ao servidor", error);
    }
    setQuery(""); // Limpa o campo de pesquisa após a busca
  };

  //Buscando as lojas para o select
  useEffect(() => {
    const fetchLojas = async () => {
      try {
        const response = await fetch(`http://localhost:8090/api/v1/lojas`);
        const data = await response.json();

        if (Array.isArray(data)) {
          const lojasOrdenadas = data.sort((a, b) => a.descricao.localeCompare(b.descricao))
          setLojas(lojasOrdenadas);
        } else {
          console.error("A resposta da API nao e um array", data);
        }
      } catch (error) {
        console.error("Erro ao buscar lojas: ", error);
      }
    };
    fetchLojas();
  }, []);

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
      disabled={currentPage === index + 1}>
      {index + 1}
    </button>
  ))

  //Front End

  return (
    <div>
      <div className={styles.container}>
        <div class="container-sm,">
          <div className={styles.input}>
            {!filtroLoja ?
            <h2 className={styles.title}>INFORME O NOME DA LOJA</h2>: <h2 className={styles.title}>RELATÓRIO GERADO</h2>}
            <form className={styles.pesquisa} onSubmit={handleSearch}>
              <label>
                {!filtroLoja ? <p>Selecione uma loja:</p> : null}
                {!filtroLoja ? <select value={query} onChange={(e) => setQuery(e.target.value)} required >
                  <option value=""></option>
                  <option value="ESTOQUE GERAL">ESTOQUE GERAL</option>
                  {lojas.map((loja) => (
                    <option key={loja.descricao} value={loja.descricao}>
                      {loja.descricao}
                    </option>
                  ))}
                </select>: null}
              </label>
              <button className={styles.btn_buscar} type="submit" onClick={handleButtonClick} > {filtroLoja ? "Novo Relatório" : "Gerar Relatório"} </button>
            </form>
          </div>
        </div>
      </div>
      <div className={styles.table} id="printable">
        {filtroLoja ? (
          <>
            <div ref={tabelaRef}>
              <p className={styles.txt_title}> RELATORIO DE ESTOQUE<br /> {query} </p>
              <div className={styles.selectQtd}>
                <span style={{ color: 'black' }}>Selecione a quantidade de itens a ser exibido por pagina:</span>
                <select value={qtdItems} name="cars" id="cars" onChange={(e) => setQtdItems(e.target.value)} >
                  <option value="5">5</option>
                  <option value="20">20</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                  <option value="1000">TODOS</option>
                </select>
              </div>
              <div className={styles.paginacao}><span style={{ color: 'black' }} >Página: {paginationButtons}</span></div>
              <table
                className="table table-secondary table-striped-columns" border="1" >
                <thead>
                  <tr>
                    <th>Loja</th>
                    <th>Data Cadastro</th>
                    <th>Dias em Estoque</th>
                    <th>Marca</th>
                    <th>Modelo</th>
                    <th>Cor</th>
                    <th>Ano Fab.</th>
                    <th>Ano Mod.</th>
                    <th>Placa</th>
                    <th>Valor FIPE</th>
                  </tr>
                </thead>
                {currentItems.map((result) => (
                  <tbody>
                    <tr key={result.id}>
                      <td>{result.unidade}</td>
                      <td>{formatTimestamp(result.data_registro)}</td>
                      <td> {result.unidade ? calculateDaysInStock(result.data_registro) : "-"} </td>
                      <td>{result.marca}</td> 
                      <td>{result.modelo}</td>
                      <td>{result.cor}</td>
                      <td>{result.ano}</td>
                      <td>{result.ano_modelo}</td>
                      <td>{result.placa}</td>
                      <td>{result.fipe}</td>
                    </tr>
                  </tbody>
                ))}
              </table>
            </div>

            <p className={styles.quantidade}>
              TOTAL DE VEICULOS EM ESTOQUE: {results.length}
            </p>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default RelEstoqueLoja;
