import styles from '../styles/Data.module.css'
import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const VendasData = () => {

    const [dadosGrafico, setDadosGrafico] = useState([])
    const [dadosPi, setDadosPi] = useState([])
    const [dataInicio, setDataInicio] = useState('')
    const [dataFim, setDataFim] = useState('')
    const [total, setTotal] = useState([])
    const [contagem, setContagem] = useState([])
    const [results, setResults] = useState([])
    const [error, setError] = useState('')


    //Contagem de vendas por loja
    const contarVendasPorLoja = (vendas) => {

        if (!Array.isArray(vendas)) {
            console.error("O parâmetro 'baixas' não é um array");
            return [];
        }

        const contagemVendas = {};

        vendas.forEach(venda => {
            // Verifica se a propriedade 'unidade' existe e é válida
            if (venda.unidade) {
                const loja = venda.unidade;

                if (contagemVendas[loja]) {
                    contagemVendas[loja]++;
                } else {
                    contagemVendas[loja] = 1;
                }
            } else {
                console.warn("Propriedade 'unidade' não encontrada em um dos objetos.");
            }
        });

        //Função que prepara os dados para o grafico
        const dadosParaGrafico = Object.keys(contagemVendas).map(loja => ({
            name: loja,
            QUANTIDADE: contagemVendas[loja]
        }))

        return dadosParaGrafico
    }


    //Função que busca os dados na tabela vendas levando em conta o período selecionado
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

            const filteredResults = data.filter(venda => {
                const dataVenda = new Date(venda.dataRegistro).toISOString().split('T')[0]
                console.log(dataVenda)
                return (
                    dataVenda >= dataInicioFormatada && dataVenda <= dataFimFormatada

                )

            })

            if (filteredResults.length > 0) {

                const dadosGraficoPreparados = contarVendasPorLoja(filteredResults);

                //Contando os veiculos por loja
                const contagem = filteredResults.reduce((acc, unidade) => {
                    acc[unidade.unidade] = (acc[unidade.unidade] || 0) + 1
                    return acc
                }, {})
                //Converte o objeto em um array de loja
                const lojasFormatadas = Object.entries(contagem).map(([nome, quantidade]) => ({
                    nome,
                    quantidade,
                }))
                setContagem(lojasFormatadas)
                setResults(filteredResults)
                setTotal(filteredResults)
                setError('')

                // Chama a função de contagem e armazena os dados no estado
                setDadosGrafico(dadosGraficoPreparados);
                setDadosPi(dadosGraficoPreparados)
            } else {
                setResults([])
                window.alert("Nao há nenhuma venda dentro do periodo selecionado.")
                window.location.reload()
            }
        } catch (error) {
            console.error('Erro ao conectar ao servidor:', error.message)
        }
    }

    //Função que disponibiliza as cores para as barras
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div style={{
                    backgroundColor: 'white',
                    border: '1px solid #ccc',
                    padding: '10px',
                    width: '150px',
                    height: '80px',
                    boxShadow: '0 0 10px rgba(0, 0, 0, 0.2 )',
                }}>
                    <p style={{ fontWeight: 'bold', color: '#8884EE' }} >{label}</p>
                    <p>{`${payload[0].name}:${payload[0].value}`}   </p>
                </div>
            )
        }
    }

    //Função que disponibiliza as cores para cada fatia do gráfico
    const COLORS = ["#0088AA", "#00C480", "#f14b09", "#FF8150", "#7A0890", "#fba500",];

    //Função que configura os rótulos do gráfico
    const renderRotulos = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, }) => {
        const RADIAN = Math.PI / 180;
        const radius = outerRadius + 80;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);
        const xLine = cx + (outerRadius + 5) * Math.cos(-midAngle * RADIAN);
        const yLine = cy + (outerRadius + 5) * Math.sin(-midAngle * RADIAN);

        return (
            <g>
                {/*Desenha a linha (seta)*/}
                <line x1={xLine} y1={yLine} x2={x} y2={y} stroke="black" strokeWidth={1} />

                <text x={x} y={y} fill="black" textAnchor={x > cx ? "start" : "end"} dominantBaseline="harging">
                    {dadosPi[index] && dadosPi[index].unidade !== "" && dadosPi[index].name}
                </text>

                <text x={x} y={y-25} fill="black" textAnchor={x > cx ? "start" : "end"} dominantBaseline="harging">
                    {` (${(percent * 100).toFixed(0)}%)`}
                </text>
            </g>
        );
    };


    return (
        <div class="container-md" id="printable">
            {/*Grafico barra - quantidade de vendas por unidade dentro de um período */}
            <div className={styles.container_bar} >
                <h2 className={styles.title}>VENDAS REALIZADAS</h2>
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
                    <ResponsiveContainer width="100%" height="60%">
                        <BarChart width={500} height={500} data={dadosGrafico} margin={{ top: 5, right: 15, left: 15, bottom: 5, }} barSize={40} >
                            <XAxis dataKey="name" scale="point" padding={{ left: 15, right: 5 }} fontSize={'14'} />
                            <YAxis />
                            <Tooltip content={<CustomTooltip />} />
                            <Legend />
                            <CartesianGrid strokeDasharray="3 3" />
                            <Bar dataKey="QUANTIDADE" fill="#8884d8" background={{ fill: '#eee' }} />
                        </BarChart>
                    </ResponsiveContainer>
                ) : (
                    null
                )}
            </div>
            <br></br>
            {/*Tabela */}
            <div className={styles.div_table}>
                <br></br>
                <table class="table table-secondary table-striped-columns" border="1" style={{ width: '500px', marginLeft: '31%' }} id='estoque_tab' >
                    <thead>
                        <tr>
                            <th >Loja</th>
                            <th style={{ width: '300px', textAlign: 'center' }}>Quantidade de Vendas No Período</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contagem.map((unidade, index) => (
                            <tr key={index}>
                                <td>{unidade.nome}</td>
                                <td>{unidade.quantidade}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <p className={styles.quantidade}>
                    TOTAL DE VENDAS NO PERÍODO: {total.length}
                </p>
            </div>
            {/*Grafico pizza: share de vendas em % das vendas dentro de um período. */}
            <div className={styles.pi_vendas}>
                <h2 className={styles.title}> SHARE DE VENDAS POR LOJA NO PERÍODO SELECIONADO (EM %)</h2>
                <p className={styles.p_txt}>
                    Aqui é possivel visualizar o share de vendas, a porcentagem de vendas de cada loja no total geral dentro do período selecionado:
                </p>
                {results.length > 0 ? (
                    <div style={{ width: "100%", height: 700}}>
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart width={400} height={400}>
                                <Pie data={dadosPi} cx="50%" cy="50%" labelLine={false} label={renderRotulos} outerRadius={200} fill="#8884d8" dataKey="QUANTIDADE">
                                    {dadosPi.map((entry, index) => ( <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} /> ))}
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                ) : (
                    null // Exibe uma mensagem de carregamento até que os dados cheguem
                )}
            </div>
        </div>
    )
}

export default VendasData
