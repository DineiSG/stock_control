import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import styles from '../styles/Data.module.css'



const EstoqueData = () => {
  const [veiculo, setVeiculo] = useState([])
  const [dadosGraficos, setDadosGrafico] = useState([])


  //Função que conta as unidades e retorna a quantidade de veiculos que ela possui
  const contarUnidades = (veiculos) => {
    const contagemUnidades = {};

    veiculos.forEach(veiculo => {
      const unidade = veiculo.unidade

      if (contagemUnidades[unidade]) {
        contagemUnidades[unidade]++
      } else {
        contagemUnidades[unidade] = 1
      }
    });

    //Função que prepara os dados para o grafico
    const dadosParaGrafico = Object.keys(contagemUnidades).map(unidade => ({
      name: unidade,
      value: contagemUnidades[unidade]
    }))

    return dadosParaGrafico

  }

  //Função que busca os dados na tabela veículos
  useEffect(() => {
    const fetchVeiculo = async () => {
      try {
        const response = await fetch(`http://192.168.1.114:8099/api/v1/veiculos`)
        const data = await response.json()
        const filteredResults = data.filter(veiculo => veiculo.unidade !== null);

        if (Array.isArray(filteredResults)) {

          const dados = contarUnidades(filteredResults)
          setDadosGrafico(dados)
          setVeiculo(filteredResults)
          
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
        <h2 className={styles.title}> RELAÇÃO ESTOQUE X LOJA (EM %)</h2>
        <p className={styles.p_txt}>Aqui é possivel visualizar a porcentagem que cada loja possui dentro do estoque válido, dos veículos no pátio do Auto Shopping:</p>
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

export default EstoqueData
