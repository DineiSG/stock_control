import React, { useState } from 'react'
import styles from '../styles/SearchForm.module.css'

const Baixar = () => {
  const [edit, setEdit] = useState(false)
  const [busca, setBusca] = useState(false)
  const [query, setQuery] = useState()
  const [results, setResults] = useState([])
  const [error, setError] = useState('')
  const [selectedMotivo, setSelectedMotivo] = useState('')
  const [editableFields, setEditableFields] = useState({
    id: '', placa: '', marca: '', modelo: '', cor: '', observacoes: '', renavan: '',
    id_unidade: '', unidade: '', valorMeioAcesso: '', motivo: '', dataRegistro: ''
  })

  /*Função que busca informações de um veiculo de acordo com a placa */
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query) return;

    const upperCaseQuery = query.toUpperCase();
    try {
      const response = await fetch(`http://localhost:8090/api/v1/veiculos?placa=${upperCaseQuery}`)
      const data = await response.json()
      const filteredResults = data.filter(veiculo => veiculo.placa.toUpperCase() === upperCaseQuery && veiculo.unidade !== null);

      if (filteredResults.length > 0) {
        setResults(filteredResults)
        setError('')
        setEditableFields(filteredResults[0])
      } else {
        setResults([])
        setError(window.alert("Nao há nenhum veiculo com a placa informada."))
      }
    } catch (error) {
      window.alert("Erro ao buscar dados.")
    }


  }

  /*Função para editar os dados encontrados */
  const handleEditToggle = async () => {
    if (edit) {
      try {
        await handleSave()
        setEdit(false)
      } catch (error) {
        console.error("Erro ao salvar: ", error)
      }

    } else {
      setEdit(true)
    }

  }

  /*Função que transforma os campos de uma tabela gerada apos a pesquisa em campos editaveis */
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setEditableFields({
      ...editableFields,
      [name]: value.toUpperCase()
    })
  }

  /*Função que salva os dados com a data atual */
  const handleSave = async () => {

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

    //Atribuindo a função à coluna data_registro
    const dataRegistro = formatTimestamp(new Date());

    //Esta função retem a data atual
    const currentDate = new Date().toISOString();

    //Esta funçao envia para o bd o motivo e a data da baixa (data_registro) para a tabela vaga.baixas
    const baixaData = { ...editableFields, motivo: selectedMotivo, dataRegistro };


    //Função que insere os dados na tabela vaga.baixas
    try {
      const baixaResponse = await fetch('http://localhost:8090/api/v1/baixas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(baixaData)
      });

      if (baixaResponse.ok) {
        const veiculo = baixaData.placa
        const deleteVeiculo = await fetch(`http://localhost:8090/api/v1/veiculos/placa/${veiculo}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          }
        });

        if (deleteVeiculo.ok) {
          console.log("Veículo excluido do BD");
          window.alert("Baixa realizada com sucesso.")

          window.location.reload()
        }
        else {
          console.log('Erro ao atualizar os dados do veículo.');
        }
      } else {
        console.log("Ocorreu um erro ao realizar a baixa.");
      }
    } catch (error) {
      console.log('Ocorreu um erro inesperado. Favor informar ao administrador.');
      window.location.reload()
    }

  }

  return (
    <div className={styles.container}>
      <div>
        <div class="container-sm">
          <h2 className={styles.title} >INFORME A PLACA DO VEÍCULO</h2>
          <form className={styles.pesquisa} onSubmit={handleSearch}>
            <label>
              <p>Placa:</p>
              <input type='text' value={query} onChange={(e) => setQuery(e.target.value)} required />
            </label>
            <button className={styles.btn_buscar} type='submit' onClick={() => setBusca(!busca)}>
              {busca ? 'Buscar' : 'Buscar'}</button>
          </form>
        </div>
        {busca ?
          <div className={styles.table}>
            <button className={styles.btn_edit} onClick={handleEditToggle}>
              {edit ? 'Salvar Baixa' : 'Baixar'}</button>
            <table className="table table-secondary table-striped-columns" border="1">
              <thead>
                <tr>
                  <th>Loja</th>
                  <th>Cod.Loja</th>
                  <th>Marca</th>
                  <th>Modelo</th>
                  <th>Cor</th>
                  <th>Nº Registro</th>
                  <th>Motivo</th>
                  <th>Observacoes</th>
                </tr>
              </thead>
              <tbody>
                {results.map(result => (
                  <tr key={result.id}>
                    <td>{result.unidade}</td>
                    <td>{result.idUnidade}</td>
                    <td>{result.marca}</td>
                    <td>{result.modelo}</td>
                    <td>{result.cor}</td>
                    <td>{result.valorMeioAcesso}</td>
                    <td>{<select type='text' name="motivo" value={selectedMotivo} onChange={(e) => setSelectedMotivo(e.target.value)} required>
                      <option value="" placeholder="SELECIONE UM MOTIVO" ></option>
                      <option value="VENDA" >VENDA</option>
                      <option value="DEVOLUCAO" >DEVOLUCAO</option>
                      <option value="TRANSFERENCIA" >TRANSFERENCIA</option>
                      <option value="CORRECAO" >CORREÇÃO DE ESTOQUE</option>
                    </select>}
                    </td>
                    <td>{edit ? <input className={styles.obs_edit} type='text' name="observacoes" value={editableFields.observacoes} onChange={handleInputChange} required /> : result.observacoes}</td>
                  </tr>
                ))}
              </tbody>
            </table>

          </div> : null}
      </div>
    </div>
  )
}

export default Baixar
