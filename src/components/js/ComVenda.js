import { useState } from 'react'
import styles from '../styles/Lojista.module.css'

const ComVenda = () => {

  const [placa, setPlaca] = useState('')
  const [veiculo, setVeiculo] = useState({ marca: '', modelo: '', cor: '', loja: '', renavan: '', observacoes: '' })
  const [observacoes, setObservacoes] = useState('');

  //Buscando os dados do veiculo de acordo com a placa
  const handleBlur = async () => {
    if (placa.length === 7) {
      try {
        const response = await fetch(`http://localhost:8090/api/veiculos/placa/${placa}`);
        if (response.ok) {
          const data = await response.json();
          setVeiculo({
            ...veiculo,
            marca: data.marca,
            modelo: data.modelo,
            cor: data.cor,
            unidade: data.unidade,
            renavan: data.renavan
          });
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
      renavan: veiculo.renavan,
      observacoes,
      dataRegistro

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


    //Enviando os dados da liberaçao para a tabela vaga.liberaçoes
    try {
      const response = await fetch('http://localhost:8090/api/liberacoes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(upperCaseData)
      });

      if (response.ok) {
        console.log('Dados enviados com sucesso');

        /*Enviando mensagem para um determinado numero pelo wpp web apos a confirmação da liberaçao*/
        const mensagem = `Prezados, favor realizar a liberação do seguinte veiculo:\nLoja: ${veiculo.unidade}\nMarca: ${veiculo.marca}\nModelo: ${veiculo.modelo}\nCor: ${veiculo.cor}\nPlaca: ${placa}\nObservação: ${observacoes}\nDesde já agradeço.`;
        const telefone = '5562981230063'
        const urlWhatsApp = `https://wa.me/${telefone}?text=${encodeURIComponent(mensagem)}`

        window.open(urlWhatsApp, '_blank')
        window.alert('Liberaçao registrada!');
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

  return (
    <div>
      <div>
        <h1><img width="70" height="70" src="https://img.icons8.com/3d-fluency/94/money.png" alt="money" /> Comunicação de Venda</h1>
        <div className={styles.container}>
          <div class="container-lg">
            <h2 className={styles.title} >INFORME OS DADOS DA OPERAÇÃO:</h2>
            <div className={styles.formulario}>
              <form className={styles.cadastro} onSubmit={handleSubmit} >
                <label>
                  <p>Placa:</p>
                  <input className={styles.tag} type='text' value={placa} maxLength='7' onChange={(e) => setPlaca(e.target.value)} onBlur={handleBlur}></input>
                </label>
                <br />
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
                  <input type='text' name='renavan' value={veiculo.renavan} readOnly required></input>
                </label>
                <label>
                  <p>Loja:</p>
                  <input type='text' name='loja' value={veiculo.unidade} readOnly required></input>
                  <input type='hidden' name='id' value={veiculo.id} readOnly required></input>
                </label>
                
                <label>
                  <p>Vendedor:</p>
                  <select type='text' name='loja' value={''} onChange={''} required >
                    <option value="" >SELECIONE UM VENDEDOR</option>
                    { /*{lojas.map((loja) => (
                                        <option key={loja.id} value={loja.id} data-descricao={loja.descricao}>
                                            {loja.descricao}
                                        </option>
                                    ))}*/}
                  </select>
                </label>
                <label>
                  <p>Nome Completo do Comprador:</p>
                  <input className={styles.obs} type='text' /*onChange={(e) => setPlaca(e.target.value)} onBlur={handleBlur}*/ required></input>
                </label>
                <br />
                <label>
                  <p>Valor Anunciado R$:</p>
                  <input className={styles.tag}  type='text' /*onChange={(e) => setPlaca(e.target.value)} onBlur={handleBlur}*/ required></input>
                </label>
                <label>
                  <p>Valor Tabela FIP R$:</p>
                  <input className={styles.tag}  type='text' /*onChange={(e) => setPlaca(e.target.value)} onBlur={handleBlur}*/ required></input>
                </label>
                <label>
                  <p>Valor de Venda R$:</p>
                  <input className={styles.tag}  type='text' /*onChange={(e) => setPlaca(e.target.value)} onBlur={handleBlur}*/ required></input>
                </label>
                <label>
                  <p>Valor Financiado R$:</p>
                  <input className={styles.tag}  type='text' /*onChange={(e) => setPlaca(e.target.value)} onBlur={handleBlur}*/ required></input>
                </label>
                <label>
                  <p>Valor de Entrada R$:</p>
                  <input className={styles.tag}  type='text' /*onChange={(e) => setPlaca(e.target.value)} onBlur={handleBlur}*/ required></input>
                </label>
                <label>
                  <p>Quantidade de Parcelas:</p>
                  <input className={styles.tag}  type='text' /*onChange={(e) => setPlaca(e.target.value)} onBlur={handleBlur}*/ required></input>
                </label>
                <label>
                  <p>Valor da Parcela R$:</p>
                  <input className={styles.tag}  type='text' /*onChange={(e) => setPlaca(e.target.value)} onBlur={handleBlur}*/ required></input>
                </label>
                <label>
                  <p>Financeira / Banco:</p>
                  <input  type='text' /*onChange={(e) => setPlaca(e.target.value)} onBlur={handleBlur}*/ required></input>
                </label>
                <label>
                  <p>Observação:</p>
                  <input type='text' className={styles.obs} name='observacoes' value={observacoes} onChange={(e) => setObservacoes(e.target.value)}></input>
                </label>
                
                <button type='submit' className={styles.btn_enviar}>Enviar</button>
              </form>
            </div>
          </div>
        </div>
        <button type='submit' className={styles.btn_consultar}>Consultar Venda</button>
      </div>
    </div>
  )
}

export default ComVenda
