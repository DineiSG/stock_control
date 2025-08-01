import React, { useState } from 'react'
import styles from '../styles/SearchForm.module.css'



const SearchLojas = () => {
    const [edit, setEdit] = useState(false)
    const [busca, setBusca] = useState(false)
    const [query, setQuery] = useState()
    const [results, setResults] = useState([])
    const [error, setError] = useState('')
    const [editableFields, setEditableFields] = useState({
        id: '',
        descricao: '',
        box: '',
        telefone: '',
        email: '',
        qtdVeiculos: ''
    })

    /*Função que busca informações de uma loja pelo nome */
    const handleSearch = async (e) => {
        e.preventDefault();
        if (!query) return;

        const upperCaseQuery = query.toUpperCase();
        try {
            const response = await fetch(`http://localhost:8090/api/v1/lojas?descricao=${upperCaseQuery}`)
            const data = await response.json()
            const filteredResults = data.filter(loja => loja.descricao.toUpperCase() === upperCaseQuery);

            if (filteredResults.length > 0) {
                setResults(filteredResults)
                setError('')
                setEditableFields(filteredResults[0])
            } else {
                setResults([])
                setError(window.alert("Nao há nenhuma loja com o nome informado."))
            }
        } catch (error) {
            window.alert("Erro ao buscar dados: ", error)
        }
        setQuery('') // Limpa o campo de pesquisa após a busca
    }

    /*Função para editar os dados encontrados */
    const handleEditToggle = () => {
        if (edit) {
            handleSave()
        }
        setEdit(!edit)
    }

    /*Função que transforma os campos de uma tabela gerada apos a pesquisa em campos editaveis */
    const handleInputChange = (e) => {
        const { name, value } = e.target
        setEditableFields({
            ...editableFields,
            [name]: value.toUpperCase()
        })
    }

    /*Função que salva os dados editados */
    const handleSave = async () => {
        try {
            const response = await fetch(`http://localhost:8090/api/v1/lojas/${editableFields.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(editableFields)
            })
            if (response.ok) {
                const updatedResult = await response.json()
                setResults(results.map(result => (result.id === updatedResult.id ? updatedResult : result)))
                window.alert("Dados atualizados com sucesso!")

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
        <div >
            <div className={styles.container}>
                <div class="container-md">
                   {!busca ? <h2 className={styles.title}>INFORME O NOME DA LOJA PARA BUSCAR INFORMAÇÕES:</h2>: <h2 className={styles.title}>RESULTADOS DA PESQUISA:</h2>}
                    <form className={styles.pesquisa} onSubmit={handleSearch}>
                        <label>
                            {!busca ? <p>Nome:</p> : null}
                            {!busca ? <input type='text' value={query} onChange={(e) => setQuery(e.target.value)} required /> : null}
                        </label>
                        <button className={styles.btn_buscar} type='submit' onClick={() => setBusca(!busca)}> {busca ? 'Nova Busca' : 'Buscar'}</button>
                    </form>
                </div>
                {busca ?
                    <div className={styles.table}>
                        <button className={styles.btn_edit} onClick={handleEditToggle}>
                            {edit ? 'Salvar' : 'Editar'}</button>
                        <table className="table table-secondary table-striped-columns" border="1">
                            <thead >
                                {results.map((result) => ( 
                                <tr className={styles.head} key={result.id}>
                                    <th className={styles.table_title} >DADOS DA LOJA</th>
                                    <th>Cod. Loja: {result.id}</th>
                                    <th>Nome: {edit ? <input className={styles.edit_data} type='text' name="descricao" value={editableFields.descricao} onChange={handleInputChange} /> : result.descricao}</th>
                                    <th>Box: {edit ? <input className={styles.edit_data} type='number' name="box" value={editableFields.box} onChange={handleInputChange} /> : result.box}</th>
                                    <th>Telefone: {edit ? <input className={styles.edit_data} type='text' name="telefone" value={editableFields.telefone} onChange={handleInputChange} /> : result.telefone}</th>
                                    <th>Email: {edit ? <input className={styles.edit_data} type='text' name="email" value={editableFields.email} onChange={handleInputChange} /> : result.email}</th>
                                    <th>Qtd Vagas: {edit ? <input classname={styles.edita_data} type='text' name="qtdVeiculos" value={editableFields.qtdVeiculos} onChange={handleInputChange}/>: result.qtdVeiculos}</th>
                                </tr>
                                ))}
                            </thead>
                        </table>

                    </div> : null}
            </div>

        </div>
    )
}

export default SearchLojas
