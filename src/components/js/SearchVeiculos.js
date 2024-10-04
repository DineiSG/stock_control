import React, { useState } from 'react'
import styles from '../styles/SearchForm.module.css'


const SearchVeiculos = () => {
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
        ano: '',
        renavan: '',
        unidade: '',
        valor_meio_acesso: ''
    })


        //Função de conversao Hexadecimal para Wiegand. Essa função recebe o valor da tag em Hexadecimal e converte para Wiegand,
    // que e um formato muito utilizado em controle de acessos.
    function hexToWiegand(hexValue) {
        // Divide o valor hexadecimal em duas partes
        const leftPartHex = hexValue.substring(0, 2); // Parte esquerda (2 primeiros caracteres)
        const rightPartHex = hexValue.substring(2);  // Parte direita (restante dos caracteres)

        // Converte as partes de hexadecimal para decimal
        const leftPart = parseInt(leftPartHex, 16); // Converte a parte esquerda para decimal
        const rightPart = parseInt(rightPartHex, 16); // Converte a parte direita para decimal

        // Formata as partes com zeros à esquerda
        const leftPartFormatted = leftPart.toString().padStart(3, '0'); // Garantir 3 dígitos na parte esquerda
        const rightPartFormatted = rightPart.toString().padStart(5, '0'); // Garantir 5 dígitos na parte direita

        // Concatena as partes formatadas
        return leftPartFormatted + rightPartFormatted;
    }  

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

    /*Função que salva os dados */
    const handleSave = async () => {

        try {
            const response = await fetch(`http://localhost:8090/api/veiculos/placa/${editableFields.placa}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(editableFields)
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
            <div class="container-lg">
                <h2 className={styles.title}>INFORME A PLACA DE UM VEÍCULO PARA BUSCAR INFORMAÇÕES:</h2>
                <form className={styles.pesquisa} onSubmit={handleSearch}>
                    <label>
                    <p>Placa:</p>
                        <input type='text' value={query} onChange={(e) => setQuery(e.target.value)} required />
                    </label>
                    <button className={styles.btn_buscar} type='submit' onClick={() => setBusca(!busca)}>
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
                                <th>Ano</th>
                                <th>Renavan</th>
                                <th>Loja</th>
                                <th>Status</th>
                                <th>Nº Tag</th>
                            </tr>
                        </thead>
                        <tbody>
                            {results.map(result => (
                                <tr key={result.id}>
                                    <td>{result.marca}</td>
                                    <td>{edit ? <input className={styles.edit_data} type='text' name="modelo" value={editableFields.modelo} onChange={handleInputChange} /> : result.modelo}</td>
                                    <td>{edit ? <input className={styles.edit_data} type='text' name="cor" value={editableFields.cor} onChange={handleInputChange} /> : result.cor}</td>
                                    <td>{edit ? <input className={styles.edit_data} type='text' name="ano" value={editableFields.ano} onChange={handleInputChange} /> : result.ano}</td>
                                    <td>{edit ? <input className={styles.edit_data} type='text' name="renavan" maxLength={11} value={editableFields.renavan} onChange={handleInputChange} /> : result.renavan}</td>
                                    <td>{edit ? <input className={styles.edit_data} type='text' name="unidade" value={editableFields.unidade} onChange={handleInputChange} /> : result.unidade}</td>
                                    <td>{edit ? <input className={styles.edit_data} type='text' name="veiculo_status" value={editableFields.veiculo_status} onChange={handleInputChange} /> : result.veiculo_status}</td>
                                    <td>{edit ? <input className={styles.edit_data} type='text' maxLength={6} name="valor_meio_acesso" value={editableFields.valor_meio_acesso} onChange={handleInputChange} /> : result.valor_meio_acesso}</td>
                                </tr>

                            ))}
                        </tbody>
                    </table> : null}
                <button className={styles.btn_edit} onClick={handleEditToggle}>
                    {edit ? 'Salvar' : 'Editar'}</button>
            </div>
        </div>
    )
}

export default SearchVeiculos
