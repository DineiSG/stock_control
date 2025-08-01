import styles from '../styles/Data.module.css'
import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const BaixasData = () => {

    const [dadosGrafico, setDadosGrafico] = useState([])
    const [dataInicio, setDataInicio] = useState('')
    const [dataFim, setDataFim] = useState('')
    const [query, setQuery] = useState('')
    const [results, setResults] = useState([])
    const [error, setError] = useState('')

    const contarBaixasPorLoja = (baixas) => {

        if (!Array.isArray(baixas)) {
            console.error("O parâmetro 'baixas' não é um array");
            return [];
        }

        const contagemBaixas = {};

        baixas.forEach(baixa => {
            // Verifica se a propriedade 'unidade' existe e é válida
            if (baixa.unidade) {
                const loja = baixa.unidade;

                if (contagemBaixas[loja]) {
                    contagemBaixas[loja]++;
                } else {
                    contagemBaixas[loja] = 1;
                }
            } else {
                console.warn("Propriedade 'unidade' não encontrada em um dos objetos.");
            }
        });

        //Função que prepara os dados para o grafico
        const dadosParaGrafico = Object.keys(contagemBaixas).map(loja => ({
            name: loja,
            QUANTIDADE: contagemBaixas[loja]
        }))

        return dadosParaGrafico
    }

    //Função que busca os dados na tabela baixas

    const fetchBaixas = async () => {

        if (!dataInicio || !dataFim || !query) {
            console.warn('Datas ou motivo nao foram definidos.')
            return
        }

        //Formatando as datas para o formato aceito pela API(YYY-MM-DD)
        const dataInicioFormatada = new Date(dataInicio).toISOString().split('T')[0]
        const dataFimFormatada = new Date(dataFim).toISOString().split('T')[0]

        const upperCaseQuery = query.toUpperCase();
      

        //Buscando as baixas pelo motivo selecionado
        try {
            const response = await fetch(`http://localhost:8090/api/v1/baixas?motivo=${upperCaseQuery}`)

            if (!response.ok) {
                console.error('Erro na resposta do servidor:', response.statusText);
                setError('Erro na resposta do servidor');
                return;
            }

            const data = await response.json()
            const filteredResults = data.filter(baixa => { const dataBaixa = new Date(baixa.dataRegistro).toISOString().split('T')[0]
                return (
                    baixa.motivo.toUpperCase() === upperCaseQuery && dataBaixa >= dataInicioFormatada && dataBaixa <= dataFimFormatada
                )
            })

            if (filteredResults.length > 0) {
                setResults(filteredResults)
                setError('')
                // Chama a função de contagem e armazena os dados no estado
                const dadosGraficoPreparados = contarBaixasPorLoja(filteredResults);
                setDadosGrafico(dadosGraficoPreparados);
            } else {
                setResults([])
                window.alert("Nao há nenhuma baixa relacionada ao motivo informado dentro do periodo selecionado.")
                window.location.reload()
            }
        } catch (error) {
            console.error('Erro ao conectar ao servidor:', error.message)
        }
    }


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

    

    

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>BAIXAS REALIZADAS</h2>
            <label>
                <p>Selecione um motivo:</p>
                <select value={query} onChange={(e) => setQuery(e.target.value)} required>
                    <option value=""></option>
                    <option value='VENDA'>VENDA</option>
                    <option value='TRANSFERENCIA'>TRANSFERENCIA</option>
                    <option value='DEVOLUCAO'>DEVOLUÇAO</option>
                    <option value='CORRECAO'>CORREÇÃO DE ESTOQUE</option>
                </select>
            </label>
            <p className={styles.p_txt}>Selecione um período para ver a quantidade de baixas de acordo com o motivo selecionado: </p>
            <div className={styles.dateInputs}>
                <label>
                    Data de Início:
                    <input className={styles.date} type="date" value={dataInicio} onChange={e => setDataInicio(e.target.value)} />
                </label>
                <label>
                    Data de Fim:
                    <input className={styles.date} type="date" value={dataFim} onChange={e => setDataFim(e.target.value)} />
                </label>
                <button className={styles.btn_buscar} onClick={fetchBaixas}>Buscar</button>
            </div>
            {dadosGrafico.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart width={500} height={500} data={dadosGrafico} margin={{ top: 5, right: 1, left: 15, bottom: 60, }} barSize={30} >
                        <XAxis dataKey="name" scale="point" padding={{ left: 15, right: 15 }} fontSize={'16'} />
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
    )
}

export default BaixasData
