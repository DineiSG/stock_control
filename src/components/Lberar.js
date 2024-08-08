import React, { useState } from 'react'
import styles from './Liberar.module.css'
import SearchLiberacoes from './SearchLiberacoes'

const Lberar = () => {

  const [placa, setPlaca] = useState('')
  const [veiculo, setVeiculo] = useState({
    marca: '',
    modelo: '',
    cor: '',
    loja: '',
    motivo: '',
    solicitante: '',
    observacoes: ''

  })
  const [motivo, setMotivo] = useState('');
  const [solicitante, setSolicitante] = useState('');
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
            unidade: data.unidade
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

    const dataRegistro = formatTimestamp(new Date())

    const dados = {
      placa,
      id: veiculo.id,
      marca: veiculo.marca,
      modelo: veiculo.modelo,
      cor: veiculo.cor,
      unidade: veiculo.unidade,
      motivo,
      solicitante,
      observacoes,
      dataRegistro

    }

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

        /*Enviando mensagem para um determinado numero pelo wpp web */
        const mensagem = `Prezados, favor realizar a liberação do seguinte veiculo:\nMarca: ${veiculo.marca}\nModelo: ${veiculo.modelo}\nCor: ${veiculo.cor}\nPlaca: ${placa}\nMotivo: ${motivo}\nDesde já agradeço.`;
        const telefone = '5562991620272'
        const urlWhatsApp = `https://wa.me/${telefone}?text=${encodeURIComponent(mensagem)}`


        window.alert('Liberaçao registrada!');
        window.open(urlWhatsApp, '_blank')
        window.location.reload();
        // Limpar o formulário se necessário
      } else {
        console.error('Erro ao enviar dados');
        window.alert('Erro ao cadastrar liberação');
      }
    } catch (error) {
      console.error('Erro na requisição', error);
    }
  };

  return (
    <div>
      <div>
        <h1>Liberação de Veículos<svg xmlns="http://www.w3.org/2000/svg" width="110" height="50" fill="currentColor" class="bi bi-arrow-down-up" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M11.5 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L11 2.707V14.5a.5.5 0 0 0 .5.5m-7-14a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L4 13.293V1.5a.5.5 0 0 1 .5-.5" />
        </svg></h1>
        <div className={styles.container}>
          <div class="container-lg">
            <h2>Informe os dados do veículo:</h2>
            <div className={styles.formulario}>
              <form className={styles.cadastro} onSubmit={handleSubmit} >
                <label>
                  <span>Placa:</span>
                  <input className={styles.tag} type='text' value={placa} maxLength='7' onChange={(e) => setPlaca(e.target.value)} onBlur={handleBlur}></input>
                </label>
                <label>
                  <span>Marca:</span>
                  <input type='text' name='marca' value={veiculo.marca} readOnly required></input>
                </label>
                <label>
                  <span>Modelo:</span>
                  <input type='text' name='modelo' value={veiculo.modelo} readOnly required></input>
                </label>
                <label>
                  <span>Cor:</span>
                  <input className={styles.cor} type='text' name='cor' value={veiculo.cor} readOnly required></input>
                </label>
                <label>
                  <span>Loja:</span>
                  <input type='text' name='loja' value={veiculo.unidade} readOnly required></input>
                  <input type='hidden' name='id' value={veiculo.id} readOnly required></input>
                </label>

                <label>
                  <span>Motivo:</span>
                  <select type='text' name='motivo' value={motivo} onChange={(e) => setMotivo(e.target.value)} required >
                    <option value="" >SELECIONE UMA JUSTIFICATIVA</option>
                    <option>MANUTENÇÃO</option>
                    <option>DEVOLUÇÃO</option>
                    <option>TRANSFERENCIA</option>
                    <option>VENDA</option>
                  </select>
                </label>
                <label>
                  <span>Solicitante:</span>
                  <input type='text' name='solicitante' value={solicitante} onChange={(e) => setSolicitante(e.target.value)} ></input>
                </label>
                <label>
                  <span>Observações:</span>
                  <textarea type='text' name='observacoes' value={observacoes} onChange={(e) => setObservacoes(e.target.value)}></textarea>
                </label>

                <button type='submit' className={styles.cadastrar}>Cadastrar</button>
              </form>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Lberar
