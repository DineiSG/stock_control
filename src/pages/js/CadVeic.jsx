import React, { useState, useEffect } from "react";
import styles from "../styles/CadVeic.module.css";
import { Link, useLocation } from "react-router-dom";

const CadVeic = () => {
  const [veiculo, setVeiculo] = useState({ unidade: "", marca: "", modelo: "", cor: "", placa: "", ano_fabricacao: "", ano_modelo: "",fipe: "", renavan: "", });
  const [fipe, setFipe] = useState("");
  const [unidade, setUnidade] = useState("");
  const [placa, setPlaca] = useState("");
  const [loading, setLoading] = useState();
  const [lojas, setLojas] = useState([]);
  const location = useLocation();
  const placaInicial = location.state?.placa || "";

  useEffect(() => {
    if (placaInicial) {
      setPlaca(placaInicial);
    }
  }, [placaInicial]);

  //Esta função busca os dados do veículo na BaseBin do Denatran.
  //A placa é enviada para a api e concatenada com as demais informações solicitadas para obtenção dos dados. Essa operaçao deve ser efetuada
  //na api pois há o bloqueio de cors por parte do backend da BASE BIN. Essa e uma transação back-to-back.
  const handleBlur = async () => {
    setLoading(true);

    if (placa.length === 7) {
      // Delimitando o tempo maximo que a consulta à base bin deve levar
      const timeoutId = setTimeout(() => {
        window.alert(
          "BASE BIN offline ou com conexao instável. Tente novamente ou realize o cadastro de forma manual. "
        );
        window.location.reload();
      }, 120000);

      await new Promise((resolve) => setTimeout(resolve, 1000));
      try {
        const response = await fetch(
          `http://localhost:8090/api/v1/veiculos/dados?placa=${placa}`
        );
        if (response.ok) {
          const dataVeiculo = await response.json();
          console.log("Dados do veiculo: ", dataVeiculo)

          //Dados do veiculo retornados da base bin
          setVeiculo({
            ...veiculo,
            Fabricante: dataVeiculo.Fabricante,
            MarcaModelo: dataVeiculo.MarcaModelo,
            CorVeiculo: dataVeiculo.CorVeiculo,
            AnoFabricacao: dataVeiculo.AnoFabricacao,
            AnoModelo: dataVeiculo.AnoModelo,
            renavam: dataVeiculo.renavam,
          });

          /*const responseFipe = await fetch(
            `http://localhost:8090/api/v1/veiculos/fipe?placa=${placa}`
          );
          if (!responseFipe.ok) {
            console.error("Erro ao buscar valor FIPE");
            window.alert("Erro ao buscar valor FIPE");
            return;
          }
          const dataFipe = await responseFipe.json();
          if (dataFipe && dataFipe.preco_fipe) {
            setFipe((prevFipe) => ({
              ...prevFipe,
              fipe: dataFipe.preco_fipe,
            }));
            console.log("Valor FIPE atualizado:", dataFipe.preco_fipe);
          } else {
            console.error("Dados FIPE inválidos", dataFipe);
            window.alert("Erro ao buscar preço FIPE. Dados inválidos");
          }

          console.log("valor fipe: ", dataFipe);*/
        } else {
          window.alert("Base BIN offline. Realize o cadastro manual do veículo.");
        }
      } catch (error) {
        console.error("Erro na requisição", error);
      } finally {
        clearTimeout(timeoutId);
        setLoading(false); // Desativa o spinner
      }
    }
  };

  //Função de conversao Hexadecimal para Wiegand. Essa função recebe o valor da tag em Hexadecimal e converte para Wiegand,
  // que e um formato muito utilizado em controle de acessos.
 /* function hexToWiegand(hexValue) {
    // Divide o valor hexadecimal em duas partes
    const leftPartHex = hexValue.substring(0, 2); // Parte esquerda (2 primeiros caracteres)
    const rightPartHex = hexValue.substring(2); // Parte direita (restante dos caracteres)

    // Converte as partes de hexadecimal para decimal
    const leftPart = parseInt(leftPartHex, 16); // Converte a parte esquerda para decimal
    const rightPart = parseInt(rightPartHex, 16); // Converte a parte direita para decimal

    // Formata as partes com zeros à esquerda
    const leftPartFormatted = leftPart.toString().padStart(3, "0"); // Garantir 3 dígitos na parte esquerda
    const rightPartFormatted = rightPart.toString().padStart(5, "0"); // Garantir 5 dígitos na parte direita

    // Concatena as partes formatadas
    return leftPartFormatted + rightPartFormatted;
  }*/

  //Função para inserir os dados no BD
  const handleSubmit = async (e) => {
    // Converte o valor hexadecimal para o formato Wiegand

    /*const convertedValue = hexToWiegand(tag);
    const valorMeioAcesso = convertedValue;*/

    /*Função que trata da inserção de data de forma automática */
    const formatTimestamp = (date) => {
      const pad = (num, size) => ("000" + num).slice(size * -1);
      const offset = -date.getTimezoneOffset();
      const sign = offset >= 0 ? "+" : "-";
      const offsetHours = pad(Math.floor(Math.abs(offset) / 60), 2);
      const offsetMinutes = pad(Math.abs(offset) % 60, 2);
      const dateString =
        date.getFullYear() +
        "-" +
        pad(date.getMonth() + 1, 2) +
        "-" +
        pad(date.getDate(), 2) +
        "T" +
        pad(date.getHours(), 2) +
        ":" +
        pad(date.getMinutes(), 2) +
        ":" +
        pad(date.getSeconds(), 2) +
        "." +
        pad(date.getMilliseconds(), 5) +
        sign +
        offsetHours +
        ":" +
        offsetMinutes;
      return dateString;
    };
    const data_registro = formatTimestamp(new Date());

    e.preventDefault();
    const payload = {
      unidade,
      marca: veiculo.Fabricante,
      modelo: veiculo.MarcaModelo,
      ano: veiculo.AnoFabricacao,
      ano_modelo: veiculo.AnoModelo,
      cor: veiculo.CorVeiculo,
      placa,
      renavan: veiculo.renavam,
      data_registro,
      fipe: fipe.fipe,
    };

    const toUpperCasePayload = (data) => {
      const upperCaseData = {};
      for (const key in data) {
        if (typeof data[key] === "string") {
          upperCaseData[key] = data[key].toUpperCase();
        } else {
          upperCaseData[key] = data[key];
        }
      }
      return upperCaseData;
    };

    const upperCasePayload = toUpperCasePayload(payload);
    console.log("Payload enviado: ", upperCasePayload);

    try {
      /*---------------------------Fazendo a verificação das vagas disponiveis */
      const responseUnidade = await fetch(
        `http://localhost:8090/api/v1/veiculos/unidade/${unidade}`
      );
      const data = await responseUnidade.json();

      const filteredResults = data.filter(
        (veiculo) => veiculo.valorMeioAcesso !== ""
      ).length;
      console.log("Quantidade de veiculos: ", filteredResults);

      const responseLoja = await fetch(`http://localhost:8090/api/v1/lojas`);
      const dataLoja = await responseLoja.json();

      const loja = dataLoja.find((loja) => loja.descricao === unidade);
      const vagasTotais = parseInt(loja.qtdVeiculos, 10);
      console.log(
        "Quantidade de vagas informadas no cadastro da loja: ",
        vagasTotais
      );

      const vagasDisponiveis = vagasTotais - filteredResults;
      console.log(`Quantidade de vagas disponíveis: ${vagasDisponiveis - 1}`);
      /*------------------------------------------------------------------------------------------------ */

      if (vagasDisponiveis > 0) {
        const response = await fetch("http://localhost:8090/api/v1/veiculos", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(upperCasePayload),
        });
        if (response.ok) {
          console.log("Cadastro realizado com sucesso!");
          window.alert("Veiculo cadastrado com sucesso!");
          window.location.reload();
        } else {
          if (placa !== "") {
            window.alert('Não foi possível realizar o cadastro do veículo. O a placa informada já está cadastrada. Verifique a placa e tente novamente.');
          }
          window.location.reload();
        }
      } else {
        window.alert(
          "Nao há vagas disponíveis para novos cadastros nesta loja. O veículo nao pode ser cadastrado."
        );
      }
    } catch (error) {
      window.alert("Erro ao realizar o cadastro. Tente novamente.");
    } finally {
    }
  };

  //Buscando lojas para preencher o select do front end
  useEffect(() => {
    const fetchLojas = async () => {
      try {
        const response = await fetch(`http://localhost:8090/api/v1/lojas`);
        const data = await response.json();


        //console.log('Dados da API: ', data)
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

  //Separando os valores de descrição e id da loja
  const handleUnidadeChange = (e) => {
    const selectedOption = e.target.selectedOptions[0];
    const id = Number(selectedOption.value);
    const descricao = selectedOption.getAttribute("data-descricao");

    setUnidade(descricao);
  };

  return (
    <div>
      <h1>
        <img
          width="70"
          height="70"
          src="https://img.icons8.com/3d-fluency/94/add.png"
          alt="add"
        />{" "}
        Cadastro de Veículos - BIN
      </h1>
      <div className={styles.container}>
        <div class="container-sm">
          <h2 className={styles.title}>INFORME OS DADOS DO VEICULO:</h2>
          <div className={styles.formulario}>
            <form className={styles.cadastro} onSubmit={handleSubmit}>
              <label>
                <p>Loja:</p>
                <select type="text" name="loja" value={unidade} onChange={handleUnidadeChange} required> <option value="">SELECIONE UMA LOJA</option>
                  {lojas.map((loja) => (
                    <option key={loja.descricao} value={loja.decricao} data-descricao={loja.descricao}>
                      {loja.descricao} </option>))}
                </select>
              </label>

              <label>
                <p>Placa:</p>
                <input className={styles.placa} type="text" name="placa" value={placa} onChange={(e) => setPlaca(e.target.value)} onBlur={handleBlur} required></input>
              </label>
              {loading && (
                <div class="spinner-border spinner-border-sm" role="status"></div>
              )}
              <label>
                <p>Marca:</p>
                <input type="text" name="marca" value={veiculo.Fabricante} onChange={(e) => setVeiculo({ ...veiculo, Fabricante: e.target.value })} required></input>
              </label>
              <label>
                <p>Modelo:</p>
                <input type="text" name="modelo" value={veiculo.MarcaModelo} onChange={(e) => setVeiculo({ ...veiculo, MarcaModelo: e.target.value })} required></input>
              </label>
              <label>
                <p>Cor:</p>
                <input className={styles.cor} type="text" name="cor" value={veiculo.CorVeiculo} readOnly required></input>
              </label>
              <label>
                <p>Ano Fab.:</p>
                <input className={styles.ano} type="text" name="ano" value={veiculo.AnoFabricacao} readOnly required></input>
              </label>
              <label>
                <p>Ano Mod:</p>
                <input className={styles.ano} type="text" name="ano_modelo" value={veiculo.AnoModelo} readOnly required></input>
              </label>
              <label>
                <p>Renavan:</p>
                <input type="text" name="renavan" value={veiculo.renavam} readOnly required></input>
              </label>
              <label>
                <p>Valor FIPE:</p>
                <input type="text" name="fipe" value={fipe.fipe} readOnly disabled required></input>
              </label>
              <button className={styles.cadastrar} onClick={() => setLoading} disabled={loading}> {loading ? "Buscando..." : "Cadastrar"} </button>
            </form>
          </div>
        </div>
      </div>
      <div>
        <Link to="/cadastro_manual">
          <button className={styles.btn_cad_manual}>Cad. S/ Cons. BIN</button>
        </Link>
      </div>
    </div>
  );
};

export default CadVeic;
