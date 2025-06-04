import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, } from "recharts";
import styles from '../styles/Data.module.css'


const AnoMod = () => {
  const [veiculo, setVeiculo] = useState([]);
  const [dadosGrafico, setDadosGrafico] = useState([]);

  const contarAnoModelo = (veiculo) => {
    const contagemAnoModelo = {};

    veiculo.forEach((veiculo) => {
      const anoModelo = veiculo.ano_modelo;

      if (contagemAnoModelo[anoModelo]) {
        contagemAnoModelo[anoModelo]++;
      } else {
        contagemAnoModelo[anoModelo] = 1;
      }
    });

    //Função que prepara os dados para o grafico
    const dadosParaGrafico = Object.keys(contagemAnoModelo).map((ano_modelo) => ({
      name: ano_modelo,
      QUANTIDADE: contagemAnoModelo[ano_modelo],
    }));

    return dadosParaGrafico;
  };

  //Função que busca os dados na tabela veículos
  useEffect(() => {
    const fetchVeiculo = async () => {
      try {
        const response = await fetch( `http://localhost:8090/api/v1/veiculos` );
        const data = await response.json();
        const filteredResults = data.filter(veiculo => veiculo.ano_modelo !== null);
        //Filtrando os dados obtidos. As coluna unidade e valorMeioAcesso devem conter dados

        if (filteredResults.length > 0) {
          const dados = contarAnoModelo(filteredResults);
          setDadosGrafico(dados);
          setVeiculo(filteredResults);
          console.log(filteredResults);
        } else {
          console.error("A resposta da API nao e um array", data);
        }
      } catch (error) {
        console.error("Erro ao buscar lojas: ", error);
      }
    };
    fetchVeiculo();
  }, []);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div
          style={{ backgroundColor: "white", border: "1px solid #ccc", padding: "10px", width: "150px", height: "80px", boxShadow: "0 0 10px rgba(0, 0, 0, 0.2 )", }}>
          <p style={{ fontWeight: "bold", color: "#8884EE" }}>{label}</p>
          <p>{`${payload[0].name}:${payload[0].value}`} </p>
        </div>
      );
    }
  };

  return (
    <div>
      <div className={styles.container}>
        <h2 className={styles.title}> QUANTIDADE DE VEÍCULOS DE ACORDO COM ANO MODELO</h2>
        <p className={styles.p_txt}>
          Abaixo pode-se visualizar as quantidades de veiculo por ano modelo que fazem
          parte do estoque das lojas que se encontram nas dependencias do Auto
          Shopping:
        </p>
        {dadosGrafico.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart width={500} height={500} data={dadosGrafico} margin={{ top: 5, right: 1, left: 15, bottom: 60, }} barSize={30}>
              <XAxis dataKey="name" scale="point" padding={{ left: 15, right: 15 }} fontSize={"16"} />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <CartesianGrid strokeDasharray="3 3" />
              <Bar dataKey="QUANTIDADE" fill="#8884d8" background={{ fill: "#eee" }} />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          null
        )}
      </div>
    </div>
  );
}

export default AnoMod
