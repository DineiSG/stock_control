import { useState } from 'react'
import styles from '../styles/Lojista.module.css'
import { Link } from 'react-router-dom'


const ComVenda = () => {

  const [infoConditions, setInfoConditions] = useState(true)
  const [observacoes, setObservacoes] = useState('');
  const [comprador, setComprador] = useState('')
  const [vendedor, setVendedor] = useState('')
  const [vendedores, setVendedores] = useState([])
  const [valorFipe, setValorFipe] = useState('')
  const [valorVenda, setValorVenda] = useState('')
  const [valorEntrada, setValorEntrada] = useState('')
  const [valorFinanciamento, setValorFinanciamento] = useState('')
  const [instituicao, setInstituicao] = useState('')
  const [tipoVenda, setTipoVenda] = useState('')
  const [placa, setPlaca] = useState('')
  const [veiculo, setVeiculo] = useState({
    marca: '',
    modelo: '',
    cor: '',
    unidade: '',
    renavam: '',
    comprador: '',
    vendendor: '',
    valorAnunciado: '',
    valorFipe: '',
    valorVenda: '',
    valorEntrada: '',
    valorFinanciamento: '',
    financeira: '',
    tipoVenda: '',
    banco: '',
    consorcio: '',
    observacoes: ''
  })

  const handleVendaChange = (e) => {
    setTipoVenda(e.target.value)
    if (e.target.value === 'aVista') {
      setInfoConditions(false)
    } else {
      setInfoConditions(true)
    }
  }



  //Buscando os dados do veiculo de acordo com a placa
  const handleBlur = async () => {

    //Função que converte o texto digitado no input placa em maiusculo
    function converterParaMaiusculo(texto){
      return texto.toUpperCase()
    }
    let texto=placa
    let textoMaiusculo=converterParaMaiusculo(texto)

    if (textoMaiusculo.length === 7) {
      try {
        const response = await fetch(`http://localhost:8090/api/veiculos/placa/${textoMaiusculo}`);
        if (response.ok) {
          const data = await response.json();
          setVeiculo({
            ...veiculo,
            marca: data.marca,
            modelo: data.modelo,
            cor: data.cor,
            unidade: data.unidade,
            renavam: data.renavan
          });
          fetchVendedores(data.unidade)
        } else {
          console.error('Erro ao buscar dados do veículo');
        }
      } catch (error) {
        console.error('Erro na requisição', error);
      }
    }
  };

  //Enviando os dados para a tabela liberaçoes
  const handleSubmit = async (e) => {
    e.preventDefault()

    //Formatando a data para enviar ao banco de dados
    const formatTimestamp = (date) => {
      const pad = (num, size) => ('000' + num).slice(size * -1);
      const offset = -date.getTimezoneOffset();
      const sign = offset >= 0 ? '+' : '-';
      const offsetHours = pad(Math.floor(Math.abs(offset) / 60), 2);
      const offsetMinutes = pad(Math.abs(offset) % 60, 2);
      const dateString = date.getFullYear() + '-' +
        pad(date.getMonth() + 1, 2) + '-' +
        pad(date.getDate(), 2) + 'T' +
        pad(date.getHours(), 2) + ':' +
        pad(date.getMinutes(), 2) + ':' +
        pad(date.getSeconds(), 2) + '.' +
        pad(date.getMilliseconds(), 5) +
        sign + offsetHours + ':' + offsetMinutes
      return dateString;
    };

    //Atribuindo a formatação da data ao campo dataRegistro
    const dataRegistro = formatTimestamp(new Date())

    //Dados que serao obtidos da tabela vaga.veiculo (retornando como veiculo.dado), e serao enviados à tabela vaga.liberaçoes
    const dados = {
      placa,
      id: veiculo.id,
      marca: veiculo.marca,
      modelo: veiculo.modelo,
      cor: veiculo.cor,
      unidade: veiculo.unidade,
      renavam: veiculo.renavam,
      comprador,
      vendedor,
      valorVenda,
      valorFipe,
      valorFinanciamento,
      valorEntrada,
      tipoVenda,
      instituicao,
      dataRegistro,
      observacoes

    }

    //Os dados informados mesmo em letra minuscula tem a fonte alterada para maiuscula antes de serem enviados para o bd
    const toUpperCaseData = (data) => {
      const upperCaseData = {};
      for (const key in data) {
        if (typeof data[key] === 'string') {
          upperCaseData[key] = data[key].toUpperCase()
        } else {
          upperCaseData[key] = data[key]
        }
      }
      return upperCaseData

    }
    const upperCaseData = toUpperCaseData(dados)


    //Enviando os dados da venda
    try {
      const response = await fetch('http://localhost:8091/api/v1/vendas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(upperCaseData)
      });

      if (response.ok) {
        console.log('Dados enviados com sucesso');

        /*Enviando mensagem para um determinado numero pelo wpp web apos a confirmação da liberaçao*/
        const mensagem = `Prezados, favor realizar a liberação do seguinte veiculo:\nLoja: ${veiculo.unidade} Placa: ${placa}\nMotivo: O veículo foi vendido e será retirado pelo comprador.\nDesde já agradeço.`;
        const telefone = '5562981230063'
        const urlWhatsApp = `https://wa.me/${telefone}?text=${encodeURIComponent(mensagem)}`

        window.open(urlWhatsApp, '_blank')
        window.alert('Solicitação de liberaçao registrada!');
        window.location.reload();
        // Limpar o formulário se necessário
      } else {
        console.error('Erro ao enviar dados');
        window.alert('Erro ao cadastrar liberação');
        window.location.reload();
      }
    } catch (error) {
      console.error('Erro na requisição', error);
    }
  };

  const fetchVendedores = async (unidade) => {
    try {
      const response = await fetch(`http://localhost:8091/api/v1/vendedor?unidade=${unidade}`)
      const data = await response.json()
      if (Array.isArray(data)) {
        setVendedores(data)
      } else {
        setVendedores([])
      }

    } catch (error) {
      console.error("Erro ao buscar vendedores: ", error)
      setVendedores([])
    }
  }

  

  return (
    <div>
      <div>
        <h1><img width="70" height="70" src="https://img.icons8.com/3d-fluency/94/money.png" alt="money" /> Comunicação de Venda</h1>
        <div className={styles.container}>
          <div class="container-lg">
            <h2 className={styles.title} >DADOS DA OPERAÇÃO</h2>
            <div className={styles.formulario}>
              <form className={styles.cadastro} onSubmit={handleSubmit} >
                <h2 className={styles.title} >INFORME OS DADOS DO VEÍCULO:</h2>
                <label>
                  <p>Placa:</p>
                  <input className={styles.tag} type='text' value={placa} maxLength='7' onChange={(e) => setPlaca(e.target.value)} onBlur={handleBlur}></input>
                </label>
                <label>
                  <p>Marca:</p>
                  <input type='text' name='marca' value={veiculo.marca} readOnly required></input>
                </label>
                <label>
                  <p>Modelo:</p>
                  <input type='text' name='modelo' value={veiculo.modelo} readOnly required></input>
                </label>
                <label>
                  <p>Cor:</p>
                  <input className={styles.cor} type='text' name='cor' value={veiculo.cor} readOnly required></input>
                </label>
                <label>
                  <p>Renavam:</p>
                  <input type='text' className={styles.tag} name='renavam' value={veiculo.renavam} readOnly required></input>
                </label>
                <label>
                  <p>Loja:</p>
                  <input type='text' name='unidade' value={veiculo.unidade} readOnly required></input>
                </label>
                <hr />
                <h2 className={styles.title} >INFORME OS DADOS DA NEGOCIAÇÃO:</h2>

                <label>
                  <p>Vendedor:</p>
                  <select type='text' name='vendedor' value={vendedor} onChange={(e) => setVendedor(e.target.value)} required >
                    <option value="" >SELECIONE UM VENDEDOR</option>
                    {vendedores.map((vendedor) => (
                      <option key={vendedor.id} value={vendedor.nome} >
                        {vendedor.nome}
                      </option>
                    ))}
                  </select>
                </label>

                <label>
                  <p>Nome Completo do Comprador:</p>
                  <input className={styles.obs} type='text' name='comprador' value={comprador} onChange={(e) => setComprador(e.target.value)} required></input>
                </label>

                <div className={styles.chk_negociacao}>
                  <p>Forma de Negociação:</p>
                  <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value='financeira' checked={tipoVenda === 'financeira'} onClick={(e) => setTipoVenda(e.target.value)} onChange={handleVendaChange} />
                    <p>Financeira</p>
                    {tipoVenda === 'financeira' && (
                      <select type='text' name='financeira' value={instituicao} onChange={(e) => setInstituicao(e.target.value)} required >
                        <option value="" >SELECIONE UMA FINANCEIRA</option>
                        <option value="C6 Bank">C6 Bank</option>
                        <option value="Safra">Safra</option>
                        <option value="Bradesco">Bradesco</option>
                        <option value="Santander">Santander</option>
                        <option value="Pan">Pan</option>
                        <option value="BV">BV</option>
                        <option value="BV">BV</option>
                        <option value="Itaú">Itaú</option>
                      </select>
                    )}
                  </div>

                  <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value='banco' checked={tipoVenda === 'banco'} onClick={(e) => setTipoVenda(e.target.value)} onChange={handleVendaChange} />
                    <p>Banco</p>
                    {tipoVenda === 'banco' && (
                      <select type='text' name='banco' value={instituicao} onChange={(e) => setInstituicao(e.target.value)} required >
                        <option value="" >SELECIONE UM BANCO</option>
                        <option value="C6 Bank">C6 Bank</option>
                        <option value="Safra">Safra</option>
                        <option value="Bradesco">Bradesco</option>
                        <option value="Santander">Santander</option>
                        <option value="Pan">Pan</option>
                        <option value="BV">BV</option>
                        <option value="BV">BV</option>
                        <option value="Itaú">Itaú</option>

                      </select>
                    )}
                  </div>

                  <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value='consorcio' checked={tipoVenda === 'consorcio'} onClick={(e) => setTipoVenda(e.target.value)} onChange={handleVendaChange} />
                    <p>Consorcio</p>
                    {tipoVenda === 'consorcio' && (
                      <input type='text' name='consorcio' value={instituicao} onChange={(e) => setInstituicao(e.target.value)} required />
                    )}
                  </div>

                  <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value='aVista' onClick={(e) => setTipoVenda(e.target.value)} onChange={handleVendaChange} />
                    <p>À Vista</p>
                  </div>
                </div>

                <br />
                <label>
                  <p>Valor Tabela FIP R$:</p>
                  <input className={styles.tag} type='text' value={valorFipe} onChange={(e) => setValorFipe(e.target.value)} ></input>
                </label>
                <label>
                  <p>Valor de Venda R$:</p>
                  <input className={styles.tag} type='text' value={valorVenda} onChange={(e) => setValorVenda(e.target.value)} required></input>
                </label>

                {infoConditions && (
                  <>
                    <label>
                      <p>Valor de Entrada R$:</p>
                      <input className={styles.tag} type='text' value={valorEntrada} onChange={(e) => setValorEntrada(e.target.value)} ></input>
                    </label>
                    <label>
                      <p>Valor Financiado R$:</p>
                      <input className={styles.tag} type='text' value={valorFinanciamento} onChange={(e) => setValorFinanciamento(e.target.value)}></input>
                    </label>
                  </>
                )}

                <label>
                  <p>Observação:</p>
                  <input type='text' className={styles.obs} name='observacoes' value={observacoes} onChange={(e) => setObservacoes(e.target.value)}></input>
                </label>

                <button type='submit' className={styles.btn_enviar}>Enviar</button>
              </form>
            </div>
          </div>
        </div>
        <Link to='/cons_venda'><button className={styles.btn_consultar}>Consultar Venda</button></Link>
      </div>
      
    </div>
  )
}

export default ComVenda
