import { useState, useRef, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import styles from '../styles/Contrato.module.css'

const Contrato = () => {

  const [placa, setPlaca] = useState("");
  const [inputValue, setInputValue] = useState("")
  const [dadosVenda, setDadosVenda] = useState("")
  const location = useLocation()
  const placaInicial = location.state?.placa || '';

  const [textoVenda, setTextoVenda] = useState(
    `VENDEDOR:\n Auto Shopping Passeio das Águas, com sede na AV.PERIMETRAL NORTE, Nº 8303, CEP 74593-841 QD ÁREA LOTE B, FAZENDA CRIMEIA CAVEIRAS, GOIÂNIA-GO, CNPJ/MF: 06.171.601/0001-43,
     IE: 10.533.977-6, FONE: (62) 9 8123-0063, E-MAIL adm@autoshoppinggo.com.br .`
  )
  const spanRef = useRef(null)

  useEffect(() => {
    if (placaInicial) {
      setPlaca(placaInicial)
    }
  }, [placaInicial])



  const buscarDados = async (e) => {

    if (e.key === "Enter") {
      e.preventDefault();


      try {

        const responseFinanceiro = await fetch(`http://localhost:8090/api/v1/vendas/placa/${placa}`)

        if (responseFinanceiro.ok) {
          const data = await responseFinanceiro.json();

          setDadosVenda({
            ...dadosVenda,
            contrato: data.id,
            placa: data.placa,
            tipoVenda: data.tipoVenda,
            instituicao: data.instituicao,
            valorVenda: data.valorVenda,
            valorEntrada: data.valorEntrada,
            valorFinanciado: data.valorFinanciamento,
            comprador: data.comprador,
            nascimento: data.nascimento,
            rua: data.rua,
            endereco: data.endereco,
            cep: data.cep,
            rg: data.rg,
            cpf: data.cpf,
            email: data.email,
            cidade: data.cidade,
            telefone: data.telefone,
            bairro: data.bairro,
            estado: data.estado,
            registro: data.dataRegistro,
            date:data.observacoes

          })

          console.log(data)

        } else {
          console.log("Erro ao buscar os dados financeiros.");
        }

        const response = await fetch(`http://localhost:8090/api/v1/veiculos/placa/${placa}`);
        if (!response.ok) {
          window.alert("Dados nao encontrados. Verifique a placa e tente novamente.")
          return
        }
        const dados = await response.json();
        console.log(dados)

        //Dados que serao necessarios
        const placaRetorno = dados.placa || "N/A";
        const marca = dados.marca || "N/A";
        const modelo = dados.modelo || "N/A";
        const cor = dados.cor || "N/A";
        const anoFabricacao = dados.ano || "N/A";
        const anoModelo = dados.ano_modelo || "N/A";
        const renavam = dados.renavan || "N/A";


        //Concatenando dados para serem apresentados no interior do Input
        const textoConcatenado = `Placa: ${placaRetorno}, Marca: ${marca}, Modelo: ${modelo}, Cor: ${cor}, Ano Fabricação: ${anoFabricacao},\nAno Modelo: ${anoModelo}, Renavam: ${renavam}`;

        setInputValue(textoConcatenado)



      } catch (error) {
        console.error("Erro na consulta: ", error)
        alert("Erro ao buscar os dados do veículo. ")

      }
    }
  }

  /*Função que trata do retorno de data */
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    
      <div class='container-sm' id='printable'>
        <div className={styles.superior}>
          <p className={styles.num_contrato}>CONTRATO:</p>
          <input className={styles.placa} tyle='text' value={placa}></input>
          <p className={styles.num_contrato}>{formatTimestamp(dadosVenda.registro)}</p>
          <img src="/imagens/aspa.png" width={150} height={80} alt='Auto Shopping' title='Auto Shopping' className={styles.logo} />
        </div>
        <div className={styles.qr} >
          <img src="/imagens/qrcodepasseio.png" width={80} height={80} alt='Passeio das Aguas' title='Passeio das Aguas' />
        </div>
        <p className={styles.title}> CONTRATO DE VENDA</p>
        <p className={styles.descricao}>PARA PARTICIPAÇÃO NA PROMOÇÂO "AMOR QUE APROXIMA" DO PASSEIO DAS ÁGUAS SHOPPING.</p>
        <div className={styles.body} >
          <div className={styles.containers}>
            <div className={styles.compra}>
              <span ref={spanRef} contentEditable suppressContentEditableWarning={true}
                style={{ color: 'black', padding: "2px", display: "inline-block", minWidth: "100px", fontSize: '12px' }} >{`COMPRADOR: ${dadosVenda.comprador},
                brasileiro(a), nascido(a) em ${dadosVenda.nascimento}, residente e domicialiado(a) na ${dadosVenda.rua}, ${dadosVenda.endereco}, CEP: 
                ${dadosVenda.cep}, bairro ${dadosVenda.bairro} na cidade de ${dadosVenda.cidade}, portador(a) do CPF. ${dadosVenda.cpf} e do RG ${dadosVenda.rg}, 
                TELEFONE ${dadosVenda.telefone}, email ${dadosVenda.email}.`}  </span>
            </div>
            <div className={styles.vendedor}>
              <span value={setTextoVenda} style={{ color: 'black', padding: "2px", display: "inline-block", minWidth: "100px", fontSize: '12px' }} > {textoVenda} </span>
              <br></br>
              <div className={styles.objeto} >
                <table className={styles.veiculo}>
                  <tr>
                    <th className={styles.tb_title} >DADOS DO VEÍCULO</th>
                  </tr>
                  <tr className={styles.info_venda}>
                    <td><textarea
                      className={styles.dados_veiculo}
                      name='placa'
                      type='text'
                      value={inputValue || placa}
                      onChange={(e) => {
                        // Permite editar o input manualmente e atualizar o valor da placa
                        setInputValue(e.target.value);
                        setPlaca(e.target.value.split(",")[0].replace("Placa: ", "").trim().toUpperCase()); // Extrai a placa
                      }}
                      onKeyDown={buscarDados}
                      placeholder='Digite a placa e pressione Enter' /></td>

                  </tr>
                </table>
              </div>
              <br>
              </br>
              <div>
                <p className={styles.fin_data}>DADOS FINANCEIROS</p>
                <table className={styles.tabela} >
                  <thead>
                    <tr className={styles.dados_venda}  >
                      <th className={styles.info_venda}>FORMA DE PAGAMENTO</th>
                      <th className={styles.info_venda}>FINANCEIRA, BANCO OU CONSORCIO</th>
                      <th className={styles.info_venda}>VALOR DE VENDA </th>
                      <th className={styles.info_venda}>VALOR DE ENTRADA </th>
                      <th className={styles.info_venda}>VALOR FINANCIADO </th>
                      <th className={styles.info_venda}>TOTAL </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className={styles.info}><input type='text' className={styles.veic_data} name='negociacao' value={dadosVenda.tipoVenda} readOnly /></td>
                      <td className={styles.info}><input type='text' className={styles.veic_data} name='instituicao' value={dadosVenda.instituicao} readOnly /></td>
                      <td className={styles.info}><input type='text' className={styles.veic_data} name='venda' value={`R$ ${dadosVenda.valorVenda}`} readOnly /></td>
                      <td className={styles.info}><input type='text' className={styles.veic_data} name='entrada' value={`R$ ${dadosVenda.valorEntrada}`} readOnly /></td>
                      <td className={styles.info}><input type='text' className={styles.veic_data} name='financiamento' value={`R$ ${dadosVenda.valorFinanciado}.00`} readOnly /></td>
                      <td className={styles.info}><input type='text' className={styles.veic_data} name='total' value={`R$ ${dadosVenda.valorVenda}`} readOnly /></td>
                    </tr>
                  </tbody>
                </table>
              </div>

            </div>
            <div className={styles.termos}>
              <h3 className={styles.condicoes}>Termo de Condições para Concessão de Prêmio</h3>
              <br></br>
              <h5 className={styles.claus_title}>1ª – Condição de Elegibilidade ao Prêmio:</h5>
              <p className={styles.clausula} >Fica estabelecido que o cliente declarado como ganhador da premiação promovida pelo Passeio das Águas Shopping somente fará jus à aquisição do prêmio se o veículo adquirido no Auto Shopping estiver devidamente registrado em seu nome ate á entrega da premiação.</p>
              <h5 className={styles.claus_title}>2ª – Comprovação da Titularidade:</h5>
              <p className={styles.clausula} >Para comprovação da titularidade, o cliente deverá apresentar:
                a) Cópia autenticada do Certificado de Registro de Veículo (CRV) ou documento equivalente que comprove a transferência de propriedade;
                b) Documento de identificação pessoal válido e atualizado;
                c) Demais documentos solicitados pelo Auto Shopping, conforme necessidade.</p>
              <h5 className={styles.claus_title}>3ª – Prazo para Regularização:</h5>
              <p className={styles.clausula} >Caso a regularização da titularidade do veículo não seja realizada no prazo estipulado, o cliente perderá automaticamente o direito ao prêmio, sem qualquer direito a compensação ou ressarcimento.</p>
              <h5 className={styles.claus_title}>4ª – Disposições Gerais:</h5>
              <p className={styles.clausula} >Este termo faz parte integrante das regras gerais da promoção e o participante, ao aderir à campanha, declara ciência e concordância com todos os seus termos e condições.</p>
              <p className={styles.clausula} >As partes reconhecem e concordam que este documento é exclusivamente para fins informativos e não constitui um contrato vinculativo ou acordo legal entre as partes. Este documento não gera obrigações legais de qualquer natureza, nem constitui compromisso, direito ou obrigação juridicamente exigível por qualquer uma das partes."</p>
              
              <p className={styles.periodo}>Promoção válida de 14/11/2024 a 31/12/2024</p>
            </div>
            <p className={styles.data_contrato}><strong> {dadosVenda.date}</strong> </p>
            <div className={styles.assinatura} >
              <input className={styles.linha} ></input>
              <p className={styles.assinar}>Assinatura Comprador</p>
            </div>
            <div className={styles.informacoes}>
              <p><strong>Certificado de autorização SPA/MF 04037951/2024</strong></p>
            </div>
          </div>
        </div>
      </div>
    
  )

}

export default Contrato
