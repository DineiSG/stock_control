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
    id: '',
    placa: '',
    marca: '',
    modelo: '',
    cor: '',
    observacoes: '',
    renavan: '',
    unidade: '',
    valor_meio_acesso: '',
    motivo: ''
  })




  /*Função que busca informações de um veiculo de acordo com a placa */
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query) return;

    const upperCaseQuery = query.toUpperCase();
    try {
      const response = await fetch(`http://localhost:8090/api/veiculos?placa=${upperCaseQuery}`)
      const data = await response.json()
      const filteredResults = data.filter(veiculo => veiculo.placa.toUpperCase() === upperCaseQuery);

      if (filteredResults.length > 0) {
        setResults(filteredResults)
        setError('')
        setEditableFields(filteredResults[0])
      } else {
        setResults([])
        setError(window.alert("Nao há nenhum veiculo com a placa informada."))
      }
    } catch (error) {
      window.alert("Erro ao buscar dados: ", error)
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
    const data_registro = formatTimestamp(new Date());

    //Esta função retem a data atual
    const currentDate = new Date().toISOString();

    //Esta funçao insere a data atual da baixa no campo data_alteraçao e remove o valor_meio_acesso da tabela vaga.veiculo
    const updatedFields = { ...editableFields, data_alteracao: currentDate, valor_meio_acesso: '' }

    //Esta funçao envia para o motivo e a data da baixa (data_registro) para a tabela vaga.baixas
    const baixaData = { ...editableFields, motivo: selectedMotivo, data_registro };


    //Função que insere os dados na tabela vaga.baixas
    try {
      const baixaResponse = await fetch('http://localhost:8090/api/baixas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(baixaData)
      });

      //Em caso de erro no envio dos dados do veiculo baixado para a tabela vaga.baixas, sera exibido o alerta na janela
      if (!baixaResponse.ok) {
        window.alert("Erro ao mover os dados para a tabela `baixas`", error);
        return;
      }

      // Função que atualiza a tabela vaga.veiculo com a data da baixa e sem o numero da tag
      const updateResponse = await fetch(`http://localhost:8090/api/veiculos/placa/${editableFields.placa}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedFields)
      })
      if (updateResponse.ok.ok) {
        const updatedResult = await updateResponse.ok.json()
        setResults(results.map(result => (result.placa === updatedResult.placa ? updatedResult : result)))
        window.alert("Dados editados com sucesso!")
        setEdit(false)

      } else {
        window.alert("Baixa realizada com sucesso.") //Averiguar posteriormente por que estava retornando este erro mesmo quando a operaçao estava correta
      }
      window.location.reload()
    } catch (error) {
      window.alert(`Erro ao enviar dados para o servidor`)
      window.location.reload()
    }
  }


  return (
    <div className={styles.container}>
      <div>
        <div class="container-lg">
          <h2 className={styles.title} >INFORME A PLACA DO VEÍCULO</h2>
          <form className={styles.pesquisa} onSubmit={handleSearch}>
            <label>
              <p>Placa:</p>
              <input type='text' value={query} onChange={(e) => setQuery(e.target.value)} required />
            </label>
            <button className={styles.buscar} type='submit' onClick={() => setBusca(!busca)}>
              {busca ? 'Buscar' : 'Buscar'}</button>
          </form>
        </div>
        <div className={styles.table}>
          {busca ?
            <table className="table table-secondary table-striped-columns" border="1">
              <thead>
                <tr>
                  <th>Marca</th>
                  <th>Modelo</th>
                  <th>Cor</th>
                  <th>Loja</th>
                  <th>Nº Tag</th>
                  <th>Motivo</th>
                  <th>Observacoes</th>
                </tr>
              </thead>
              <tbody>
                {results.map(result => (
                  <tr key={result.id}>
                    <td>{result.marca}</td>
                    <td>{result.modelo}</td>
                    <td>{result.cor}</td>
                    <td>{result.unidade}</td>
                    <td>{result.valor_meio_acesso}</td>
                    <td>{<select type='text' name="motivo" value={selectedMotivo} onChange={(e) => setSelectedMotivo(e.target.value)} required>
                      <option value="">INFORME O MOTIVO DA BAIXA</option>
                      <option value="VENDA" >VENDA</option>
                      <option value="DEVOLUCAO" >DEVOLUCAO</option>
                      <option value="TRANSFERENCIA" >TRANSFERENCIA</option>
                    </select>}
                    </td>
                    <td>{edit ? <textarea className={styles.edit_data} type='text' name="observacoes" value={editableFields.observacoes} onChange={handleInputChange} /> : result.observacoes}</td>
                  </tr>

                ))}
              </tbody>
            </table> : null}
          <button className={styles.edit} onClick={handleEditToggle}>
            {edit ? 'Baixar' : 'Editar'}</button>
        </div>
      </div>
    </div>
  )
}

export default Baixar
