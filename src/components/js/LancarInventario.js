import React, { useCallback, useRef } from 'react'
import { useState, useEffect } from 'react'
import styles from '../styles/Inventario.module.css'

const LancarInventario = () => {

    const [salvar, setSalvar] = useState(false)
    const [busca, setBusca] = useState(false)
    const [confirmacao, setConfirmacao] = useState(false)
    const [query, setQuery] = useState()
    const [results, setResults] = useState([])
    const [editMode, setEditMode] = useState({});
    const [editableFields, setEditableFields] = useState({})
    const [resultado, setResultado] = useState({
        id_inventario: '',
        unidade: '',
        qtd_divergencias: 0,
        acuracidade: 0,
        observacoes: ''
    })

    //Tratando o foco da tela ao clicar o botao. Mudando para a tabela
    const tabelaRef = useRef(null)
    

    const handleButtonClick = () => {
        setBusca(!busca) //Alterando o estado da tabela
        setTimeout(() => {
            if (tabelaRef.current) {
                tabelaRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }
        }, 100)//Timeout para garantir que a tabela esteja visivel apos a renderização

    }

    const tabelaSaveRef = useRef(null)
    const handleBtnSaveClick = () => {
         //Alterando o estado da tabela
        setSalvar(!salvar)
        calcularResultados()
        setTimeout(() => {
            if (tabelaSaveRef.current) {
                tabelaSaveRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }
        }, 100)//Timeout para garantir que a tabela esteja visivel apos a renderização

    }



    /*Função que busca informações de um veiculo de acordo com a placa */
    const handleSearch = async (e) => {
        e.preventDefault();
        if (!query) return;

        try {
            const response = await fetch(`http://localhost:8090/api/inventario?id_inventario=${query}`)
            if (!response.ok) {
                throw new Error('Erro na requisição')
            }
            const data = await response.json();
            setResults(data);
            setBusca(true);

            //Preenchendo os campos Cod. Inventario e Loja de forma automatica
            setResultado((prevState) => ({
                ...prevState,
                id_inventario: query,
                loja: data.lenght > 0 ? '' : data[0].unidade

            }))
        } catch (error) {
            window.alert("Erro ao buscar dados: ", error)
        }
    }

    /*Função para editar os dados encontrados */
    const handleEditToggle = (id) => {
        setEditMode((prevState) => ({
            ...prevState,
            [id]: !prevState[id], // Alterna o modo de edição para a linha específica
        }));
    };

    /*Função que transforma os campos da tabela Inventario gerada apos a pesquisa em campos editaveis */
    const handleInputChange = (e, id) => {
        const { name, value } = e.target
        setEditableFields((prevState) => ({
            ...prevState,
            [id]: {
                ...prevState[id],
                [name]: value,
            },
        }));
    }

    //Calculando o resultado do inventario
    const calcularResultados = useCallback(() => {
        const totalItems = results.length;

        const divergencias = results.filter(item => {
            // Normaliza o valor de 'conferencia' para comparação
            const conferencia = (editableFields[item.id]?.conferencia || item.conferencia || '').trim().toUpperCase();
            return conferencia !== 'OK';
        }).length;

        const acuracidade = totalItems > 0 ? ((totalItems - divergencias) / totalItems) * 100 : 0;

        setResultado(prevState => ({
            ...prevState,
            qtd_divergencias: divergencias,
            acuracidade: acuracidade.toFixed(2) + '%',
        }));
    }, [editableFields, results]);

    // Chamar a função ao exibir resultados
    useEffect(() => {
        if (salvar) {
            calcularResultados();
        }
    }, [salvar, editableFields, results, calcularResultados]);

    const handleSalvar = async () => {
        calcularResultados()

        const data_registro = new Date(results[0].data_registro).getTime(); //Data de abertura do inventario
        const data_fechamento = new Date().getTime() //Data gerada ao clicar em salvar

        const dataToSave = {
            id_inventario: resultado.id_inventario,
            unidade: resultado.loja,
            data_abertura: data_registro,  // ou obtenha do banco de dados
            data_fechamento: data_fechamento,
            qtd_divergencias: resultado.qtd_divergencias,
            acuracidade: resultado.acuracidade,
            observacoes: resultado.observacoes
        };

        try {
            const response = await fetch('http://localhost:8090/api/resultado', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSave),
            })
            if (!response.ok) {
                throw new Error(window.alert("Inventario ja existente ou dados incorretos."))
            }

            window.alert('Resultado do inventario salvo com sucesso!')

            // Deletar a listagem existente na tabela inventário
            const deleteResponse = await fetch(`http://localhost:8090/api/inventario/id_inventario/${resultado.id_inventario}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!deleteResponse.ok) {
                throw new Error("Erro ao deletar a listagem do inventário.");
            }

            window.alert('Listagem do inventário deletada com sucesso!');
            window.location.reload();


        } catch (error) {
            window.alert("Erro ao salvar os dados ou ao deletar a listagem do inventario. ", error)
            window.location.reload()
        }
    }

    // Função para confirmar a edição
    const handleConfirm = (id) => {
        // Atualiza o estado para manter o valor exibido após a confirmação
        setEditableFields(prevState => ({
            ...prevState,
            [id]: { ...prevState[id], conferencia: prevState[id]?.conferencia || results.conferencia }
        }));
        setEditMode(prevState => ({
            ...prevState,
            [id]: false
        }));
        setConfirmacao(true); // Alterna o estado do botão para Confirmar
    };



    return (
        <div class="container-lg">
            <div className={styles.input}>
                <h2 className={styles.title}>INFORME O CODIGO DO INVENTARIO PARA BUSCAR A LISTAGEM E LANÇAR A CONFERENCIA:</h2>
                <form className={styles.pesquisa} onSubmit={handleSearch}>
                    <label>
                        <p>Codigo do Inventario:</p>
                        <input type='number' value={query} onChange={(e) => setQuery(e.target.value)} onKeyDown={(e) => {
                            // Função que impede que letras e caracteres sejam inseridos
                            if (!/^\d*\.?\d*$/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Delete' && e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') {
                                e.preventDefault();
                            }
                        }} required />
                    </label>
                    <button className={styles.btn_buscar_inv} type='submit' onClick={handleButtonClick}>
                        {busca ? 'Buscar' : 'Buscar'}</button>
                </form>
            </div>
            <div ref={tabelaRef} className={styles.list} id='list_printable'>
                {busca ?
                    <table className="table table-primary table-striped-columns" border="1">
                        <thead>
                            <tr>
                                <th>Loja</th>
                                <th>Marca</th>
                                <th>Modelo</th>
                                <th>Cor</th>
                                <th>Placa</th>
                                <th>Renavan</th>
                                <th>Conferencia</th>
                                <th>Ação</th>
                            </tr>
                        </thead>
                        <tbody>
                            {results.map(result => (
                                <tr key={result.id}>
                                    <td>{result.unidade}</td>
                                    <td>{result.marca}</td>
                                    <td>{result.modelo}</td>
                                    <td>{result.cor}</td>
                                    <td>{result.renavan}</td>
                                    <td>{result.placa}</td>
                                    <td>{editMode[result.id] ? (
                                        <input
                                            className={styles.edit_data}
                                            type='text'
                                            name="conferencia"
                                            value={editableFields[result.id]?.conferencia || result.conferencia}
                                            onChange={(e) => handleInputChange(e, result.id)} />) : (editableFields[result.id]?.conferencia || result.conferencia)}
                                    </td>
                                    <td>
                                        <button className={styles.btn_edit} onClick={() => {
                                            if (editMode[result.id] && !confirmacao) {
                                                handleConfirm(result.id); // Confirma a edição
                                            } else {
                                                handleEditToggle(result.id); // Alterna o modo de edição
                                                setConfirmacao(false); // Atualiza o estado do botão
                                            }
                                        }}>{confirmacao ? 'Lançar Conferencia' : 'Confirmar'}</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table> : null}
                <button className={styles.btn_resultado} type='submit' onClick={handleBtnSaveClick}>
                    {salvar ? 'Resultado' : 'Exibir Resultado'}
                </button>
                <div ref={tabelaSaveRef}>
                    {salvar ?
                        <div>
                            <table className="table table-primary table-striped-columns" border="1">
                                <thead>
                                    <tr className={styles.result}>
                                        <th>Cod. Inventario: {resultado.id_inventario}</th>
                                        <th>Loja: {resultado.loja}</th>
                                        <th>Quantidade de Divergerncias: {resultado.qtd_divergencias}</th>
                                        <th>Acuracidade: {resultado.acuracidade}</th>
                                        <th>Observações: <input type='text' className={styles.obs_result} value={resultado.observacoes} onChange={(e) => setResultado({ ...resultado, observacoes: e.target.value })} /></th>
                                    </tr>
                                </thead>
                            </table>
                            <button className={styles.btn_salvar} onClick={handleSalvar}>
                                Salvar
                            </button>
                        </div> : null}
                </div>
            </div>

        </div>
    )
}

export default LancarInventario
