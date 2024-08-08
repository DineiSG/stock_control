import React, { useState } from 'react'
import styles from './SearchForm.module.css'

const Baixar = () => {
  const [edit, setEdit] = useState(false)
  const [busca, setBusca] = useState(false)
  const [query, setQuery] = useState()
  const [results, setResults] = useState([])
  const [error, setError] = useState('')
  const [editableFields, setEditableFields] = useState({
    id: '',
    marca: '',
    modelo: '',
    cor: '',
    observacoes: '',
    unidade: '',
    valor_meio_acesso: '',
    data_alteracao:''
    
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

  /*Função que salva os dados atualizados */
  const handleSave = async () => {
    
    /*Função que adiciona a data atual na hora de atualizar um veiculo */
    const currentDate = new Date().toISOString();
    const updatedFields = {...editableFields, data_alteracao: currentDate}
    
    try {
      const response = await fetch(`http://localhost:8090/api/veiculos/placa/${editableFields.placa}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedFields)
      })
      if (response.ok) {
        const updatedResult = await response.json()
        setResults(results.map(result => (result.placa === updatedResult.placa ? updatedResult : result)))
        window.alert("Dados editados com sucesso!")
        setEdit(false)

      } else {
        window.alert("Erro ao salvar os dados")
      }
      window.location.reload()
    } catch (error) {
      window.alert(`Erro ao enviar dados para o servidor`, error)
      window.location.reload()
    }
  }


  return (
    <div className={styles.container}>
      <div>
        <div class="container-lg">
          <h2>Informe a placa para realizar a baixa do veículo:</h2>
          <form className={styles.pesquisa} onSubmit={handleSearch}>
            <label>
              <span>Placa:</span>
              <input type='text' value={query} onChange={(e) => setQuery(e.target.value)} required />
            </label>
            <button className={styles.buscar} type='submit' onClick={() => setBusca(!busca)}>
              {busca ? 'Buscar' : 'Buscar'}</button>
          </form>
        </div>
        <div className={styles.table}>
          {busca ?
            <table className="table table-primary table-striped-columns" border="1">
              <thead>
                <tr>
                  <th>Marca</th>
                  <th>Modelo</th>
                  <th>Cor</th>
                  <th>Loja</th>
                  <th>Nº Tag</th>
                  <th>Justificativa</th>
                </tr>
              </thead>
              <tbody>
                {results.map(result => (
                  <tr key={result.id}>
                    <td>{result.marca}</td>
                    <td>{result.modelo}</td>
                    <td>{result.cor}</td>
                    <td>{edit ? <input className={styles.edit_data} type='text' name="unidade" value={editableFields.unidade} onChange={handleInputChange} /> : result.unidade}</td>
                    <td>{edit ? <input className={styles.edit_data} type='text' maxLength={6} name="valor_meio_acesso" value={editableFields.valor_meio_acesso} onChange={handleInputChange} /> : result.valor_meio_acesso}</td>
                    <td>{edit ? <textarea type='text' name="observacoes" maxLength={11} value={editableFields.observacoes} onChange={handleInputChange} /> : result.observacoes}</td>
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
