import React, { useState, useEffect } from 'react'
import styles from '../styles/SearchForm.module.css'


const SearchVeiculos = () => {

    const [lojas, setLojas] = useState([])
    const [edit, setEdit] = useState(false)
    const [busca, setBusca] = useState(false)
    const [query, setQuery] = useState()
    const [results, setResults] = useState([])
    const [error, setError] = useState('')
    const [unidade, setUnidade] = useState('')
    const [idUnidade, setIdUnidade] = useState('')
    const [editableFields, setEditableFields] = useState({ id: '', marca: '', modelo: '', cor: '', ano: '', ano_modelo: '', renavan: '', unidade: '', tag: '', fipe: '', observacoes: '', valor_meio_acesso: '', idUnidade: '' })



    /*Função que busca informações de um veiculo de acordo com a placa */
    const handleSearch = async (e) => {
        e.preventDefault();
        if (!query) return;

        const upperCaseQuery = query.toUpperCase();
        try {
            const response = await fetch(`http://localhost:8090/api/v1/veiculos?placa=${upperCaseQuery}`)
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



    //Função de conversao Hexadecimal para Wiegand. Essa função recebe o valor da tag em Hexadecimal e converte para Wiegand,
    // que e um formato muito utilizado em controle de acessos.
    function hexToWiegand(hexValue) {
        if (!hexValue) {
            console.error("hexValue está indefinido ou nulo:", hexValue);
            return '';
        }

        hexValue = String(hexValue);
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
    }

    /*Função que transforma os campos de uma tabela gerada apos a pesquisa em campos editaveis */
    const handleInputChange = (e) => {
        const { name, value, type } = e.target;

        // Se o campo for do tipo texto, apenas atualiza o estado
        if (type === "text") {
            setEditableFields({
                ...editableFields,
                [name]: value.toUpperCase(), // Converte o valor para maiúsculas (se necessário)
            });
            return;
        }

        // Caso o campo seja um <select>, aplica a lógica de validação de opções
        const selectedOption = e.target.selectedOptions?.[0];
        if (!selectedOption || selectedOption.value === "") {
            console.error("Nenhuma loja válida foi selecionada.");
            setUnidade(null);
            setIdUnidade("");
            return;
        }

        const id = Number(selectedOption.value);
        const unidade = selectedOption.getAttribute("data-descricao");

        setUnidade(unidade);
        setIdUnidade(id);

        setEditableFields({
            ...editableFields,
            [name]: value.toUpperCase(),
        });
    };

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


    const tag = editableFields.tag;
    /*Função que salva os dados */
    const handleSave = async () => {

        const convertedValue = hexToWiegand(tag);
        editableFields.valor_meio_acesso = convertedValue;
        console.log(convertedValue)

        editableFields.unidade = unidade;
        editableFields.idUnidade = idUnidade;

        try {
            /*---------------------------Fazendo a verificação das vagas disponiveis */
            const responseUnidade = await fetch(`http://localhost:8090/api/v1/veiculos/unidade/${unidade}`)
            const data = await responseUnidade.json()

            const filteredResults = data.filter(veiculo => veiculo.valor_meio_acesso !== '').length;
            console.log("Quantidade de veiculos: ", filteredResults.length)

            const responseLoja = await fetch(`http://localhost:8090/api/v1/lojas`)
            const dataLoja = await responseLoja.json()

            const loja = dataLoja.find(loja => loja.descricao === unidade)
            const vagasTotais = parseInt(loja.qtdVeiculos, 10)
            console.log("Quantidade de vagas informadas no cadastro da loja: ", vagasTotais)

            const vagasDisponiveis = vagasTotais - filteredResults
            console.log("Quantidade de vagas disponiveis antes do cadastro do veiculo: ", vagasDisponiveis)
            /*------------------------------------------------------------------------------------------------ */
            if (vagasDisponiveis > 0) {
                const response = await fetch(`http://localhost:8090/api/v1/veiculos/placa/${editableFields.placa}`, {
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
            }else{
                window.alert("Nao há vagas disponíveis para novos cadastros nesta loja. O veículo nao pode ser recadastrado.")
            }
        } catch (error) {
            console.log(`Erro ao enviar dados para o servidor`, error)

        }
    }

    //Buscando lojas para preencher o select do front end
    useEffect(() => {
        const fetchLojas = async () => {
            try {
                const response = await fetch(`http://localhost:8090/api/v1/lojas`)
                const data = await response.json()
                if (Array.isArray(data)) {
                    const lojasOrdenadas = data.sort((a, b) => a.descricao.localeCompare(b.descricao))
                    setLojas(lojasOrdenadas);
                } else {
                    console.error('A resposta da API nao e um array', data)
                }
            } catch (error) {
                console.error('Erro ao buscar lojas: ', error)
            }
        }
        fetchLojas()
    }, [])

    //Separando os valores de descrição e id da loja 
    /*  const handleUnidadeChange = (e) => {
          const selectedOption = e.target.selectedOptions[0]
          const id = Number(selectedOption.value)
          const unidade = selectedOption.getAttribute('data-descricao')
  
          setUnidade(unidade)
          setIdUnidade(id)
  
      }*/




    return (
        <div className={styles.container}>
            <div class="container-sm">
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
            {busca ?
                <div className={styles.table}>
                    <button className={styles.btn_edit} onClick={handleEditToggle}>
                        {edit ? 'Salvar' : 'Editar'}</button>

                    <table className="table table-secondary table-striped-columns" border="1">
                        <thead>
                            {results.map(result => (
                                <tr className={styles.head} key={result.id}>
                                    <th className={styles.table_title} >DADOS DO VEÍCULO</th>
                                    <th>Marca: {result.marca}</th>
                                    <th>Modelo: {result.modelo}</th>
                                    <th>Cor: {result.cor}</th>
                                    <th>Renavan: {result.renavan}</th>
                                    <th>Loja: {edit ? <select name="loja" value={idUnidade || ""} onChange={handleInputChange} required>
                                        <option value="" disabled>SELECIONE UMA LOJA</option>
                                        {lojas.map((loja) => (
                                            <option
                                                key={loja.id}
                                                value={loja.id}
                                                data-descricao={loja.descricao}
                                            >
                                                {loja.descricao}
                                            </option>
                                        ))}
                                    </select> : result.unidade}</th>
                                    <th>Nº Tag: {edit ? <input className={styles.edit_data} type='text' name="tag" value={editableFields.tag} onChange={handleInputChange} /> : result.tag}</th>
                                    <th>Status: {edit ? <input className={styles.edit_data} type='text' name="veiculo_status" value={editableFields.veiculo_status} onChange={handleInputChange} /> : result.veiculo_status}</th>
                                    <th>Ano de Fabricação: {result.ano}</th>
                                    <th>Ano Modelo: {result.ano_modelo}</th>
                                    <th>Valor FIPE: {result.fipe}</th>
                                    <th>Observaçoes: {edit ? <input className={styles.edit_data} type='text' name="observacoes" value={editableFields.observacoes} onChange={handleInputChange} /> : result.observacoes}</th>
                                    <th>Numero de Registro: {result.valor_meio_acesso}</th>
                                </tr>
                            ))}
                        </thead>
                    </table>

                </div> : null}
        </div>
    )
}

export default SearchVeiculos
