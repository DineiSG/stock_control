import { useState, useEffect }  from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, } from "recharts";
import styles from '../styles/Data.module.css'

const InstData = () => {
  const [venda, setVenda] = useState([]);
  const [dadosGrafico, setDadosGrafico] = useState([]);
  const [dataInicio, setDataInicio] = useState('')
  const [dataFim, setDataFim] = useState('')
  const [results, setResults] = useState([])
  const [error, setError] = useState('')

  const contarVenda = (venda) => {
    const contagemVendas = {};

    venda.forEach((venda) => {
      const instFinan = venda.instituicao;

      if (contagemVendas[instFinan]) {
        contagemVendas[instFinan]++;
      } else {
        contagemVendas[instFinan] = 1;
      }
    });

    //Função que prepara os dados para o grafico
    const dadosParaGrafico = Object.keys(contagemVendas).map((instituicao) => ({
      name: instituicao,
      QUANTIDADE: contagemVendas[instituicao],
    }));

    return dadosParaGrafico;
  };

  //Função que busca os dados na tabela veículos
  const fetchVendas = async () => {

    if (!dataInicio || !dataFim) {
        console.warn('Datas de inicio e fim nao definidos.')
        return
    }

    //Formatando as datas para o formato aceito pela API(YYY-MM-DD)
    const dataInicioFormatada = new Date(dataInicio).toISOString().split('T')[0]
    const dataFimFormatada = new Date(dataFim).toISOString().split('T')[0]

    //Buscando as baixas pelo motivo selecionado
    try {
        const response = await fetch(`http://localhost:8090/api/v1/vendas`)

        if (!response.ok) {
            console.error('Erro na resposta do servidor:', response.statusText);
            setError('Erro na resposta do servidor');
            return;
        }

        const data = await response.json()

        const filteredResults = data.filter(venda => { const dataVenda = new Date(venda.dataRegistro).toISOString().split('T')[0]
            console.log(dataVenda)
            return (
                dataVenda >= dataInicioFormatada && dataVenda <= dataFimFormatada
                
            )
            
        })

        if (filteredResults.length > 0) {
            
            setResults(filteredResults)
            setError('')
            // Chama a função de contagem e armazena os dados no estado
            const dadosGraficoPreparados = contarVenda(filteredResults);
            setDadosGrafico(dadosGraficoPreparados);
        } else {
            setResults([])
            window.alert("Nao há nenhuma venda dentro do periodo selecionado.")
            window.location.reload()
        }
    } catch (error) {
        console.error('Erro ao conectar ao servidor:', error.message)
    }
}

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div
          style={{
            backgroundColor: "white",
            border: "1px solid #ccc",
            padding: "10px",
            width: "150px",
            height: "80px",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.2 )",
          }}>
          <p style={{ fontWeight: "bold", color: "#8884EE" }}>{label}</p>
          <p>{`${payload[0].name}:${payload[0].value}`} </p>
        </div>
      );
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}> QUANTIDADE DE VENDAS POR INSTITUICAO</h2>
      <p className={styles.p_txt}>
        Abaixo pode-se visualizar as quantidades de venda por instituicao.
      </p>
      <p className={styles.p_txt}>Selecione um período para ver a quantidade de vendas: </p>
            <div className={styles.dateInputs}>
                <label>
                    Data de Início:
                    <input className={styles.date} type="date" value={dataInicio} onChange={e => setDataInicio(e.target.value)} />
                </label>
                <label>
                    Data de Fim:
                    <input className={styles.date} type="date" value={dataFim} onChange={e => setDataFim(e.target.value)} />
                </label>
                <button className={styles.btn_buscar} onClick={fetchVendas} s>Buscar</button>
            </div>
      {dadosGrafico.length > 0 ? (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={500}
            data={dadosGrafico}
            margin={{
              top: 5,
              right: 1,
              left: 15,
              bottom: 60,
            }}
            barSize={30}>
            <XAxis
              dataKey="name"
              scale="point"
              padding={{ left: 15, right: 15 }}
              fontSize={"16"}
            />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <CartesianGrid strokeDasharray="3 3" />
            <Bar
              dataKey="QUANTIDADE"
              fill="#8884d8"
              background={{ fill: "#eee" }}
            />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <p>Carregando dados...</p>
      )}
    </div>
  );
}

export default InstData
