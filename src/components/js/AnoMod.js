import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import styles from '../styles/Data.module.css'

const AnoMod = () => {
    const [veiculo, setVeiculo] = useState([])
    const [dadosGraficos, setDadosGrafico] = useState([])
  
  
    //Função que conta as unidades e retorna a quantidade de veiculos que ela possui
    const quantAnoModelo = (veiculos) => {
      const contagemAnoModelo = {};
  
      veiculos.forEach(veiculo => {
        const ano_modelo = veiculo.ano_modelo
  
        if (contagemAnoModelo[ano_modelo]) {
            contagemAnoModelo[ano_modelo]++
        } else {
            contagemAnoModelo[ano_modelo] = 1
        }
      });
  
      //Função que prepara os dados para o grafico
      const dadosParaGrafico = Object.keys(contagemAnoModelo).map(anoModelo => ({
        name: anoModelo,
        value: contagemAnoModelo[anoModelo]
      }))
  
      return dadosParaGrafico
  
    }
  
    //Função que busca os dados na tabela veículos
    useEffect(() => {
      const fetchVeiculo = async () => {
        try {
          const response = await fetch(`http://localhost:8090/api/v1/veiculos`)
          const data = await response.json()
  
          if (Array.isArray(data)) {
  
            const dados = quantAnoModelo(data)
            setDadosGrafico(dados)
            setVeiculo(data)
            
          } else {
            console.error('A resposta da API nao e um array', data)
          }
        } catch (error) {
          console.error('Erro ao buscar lojas: ', error)
        }
      }
      fetchVeiculo()
    }, [])
  
  
    //Função que disponibiliza as cores para cada fatia do gráfico
    const COLORS = ['#0088AA', '#00C480', '#f14b09', '#FF8150', '#7A0890', '#fba500'];
  
  
    //Função que configura os rótulos do gráfico
    const renderRotulos = ({
      cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
      const RADIAN = Math.PI / 180
      const radius = outerRadius + 100
      const x = cx + radius * Math.cos(-midAngle * RADIAN)
      const y = cy + radius * Math.sin(-midAngle * RADIAN)
      const xLine = cx + (outerRadius + 20) * Math.cos(-midAngle * RADIAN)
      const yLine = cy + (outerRadius + 20) * Math.sin(-midAngle * RADIAN)
  
      return (
        <g>
          {/*Desenha a linha (seta)*/}
          <line
            x1={xLine}
            y1={yLine}
            x2={x}
            y2={y}
            stroke='black'
            strokeWidth={1}
          />
          <text
            x={x}
            y={y}
            fill='black'
            textAnchor={x > cx ? 'start' : 'end'}
            dominantBaseline="central">
            {dadosGraficos[index] && dadosGraficos[index].unidade !== '' && dadosGraficos[index].name}
          </text>
  
          <text
            x={x}
            y={y + 25}
            fill="black"
            textAnchor={x > cx ? 'start' : 'end'}
            dominantBaseline="central">
            {` (${(percent * 100).toFixed(0)}%)`}
          </text>
        </g>
      )
    }
  
    return (
      <div >
        <div className={styles.pi}>
          <h2 className={styles.title}> QUANTIDADE DE VEICULOS DE ACORDO COM O ANO DO MODELO (EM %)</h2>
          <p className={styles.p_txt}>Aqui é possivel visualizar a quantidade de veículos (em %) com relaçao ao ano modelo:</p>
          {veiculo.length > 0 ? (
            <div style={{ width: '100%', height: 800 }}>
              <ResponsiveContainer width="100%" height="100%" >
                <PieChart width={400} height={400}>
                  <Pie
                    data={dadosGraficos}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderRotulos}
                    outerRadius={200}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {dadosGraficos.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <p>Carregando...</p> // Exibe uma mensagem de carregamento até que os dados cheguem
          )}
        </div>
      </div>
    )
}

export default AnoMod
