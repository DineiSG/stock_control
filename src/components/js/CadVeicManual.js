import React, { useState, useEffect } from 'react'
import styles from '../../pages/styles/CadVeic.module.css'


const url = 'http://localhost:8090/api/veiculos'
const CadVeicManual = () => {
    const [unidade, setUnidade] = useState('')
    const [id_unidade, setIdUnidade] = useState('')
    const [marca, setMarca] = useState('')
    const [modelo, setModelo] = useState('')
    const [cor, setCor] = useState('')
    const [placa, setPlaca] = useState('')
    const [ano, setAno] = useState('')
    const [valor_meio_acesso, setValorMeioAcesso] = useState('')
    const [veiculo_status, setVeiculoStatus] = useState('')
    const [renavan, setRenavan] = useState('')
    const [loading, setLoading] = useState()
    const [lojas, setLojas] = useState([])


    //Função para inserir os dados no BD
    const handleSubmit = async (e) => {

        /*Função que trata da inserção de data de forma automática */
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
        const data_registro = formatTimestamp(new Date());

        e.preventDefault()
        const payload = {
            unidade, id_unidade, marca, modelo, ano, cor, placa, valor_meio_acesso, veiculo_status, renavan, data_registro
        }

        const toUpperCasePayload = (data) => {
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

        const upperCasePayload = toUpperCasePayload(payload)
        console.log('Payload enviado: ', upperCasePayload)
        console.log('Payload enviado: ', payload)

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(upperCasePayload),
            })
            if (response.ok) {
                console.log('Cadastro realizado com sucesso!')
                window.alert('Veiculo cadastrado com sucesso!');
                window.location.reload();
            } else {
                console.log('Erro ao enviar os dados')
                window.alert('Erro ao realizar o cadastro. Tente novamente.');
            }
        } catch (error) {
            window.alert('Erro ao realizar o cadastro. Tente novamente.');
        } finally {

        }
    }

    //Buscando lojas para preencher o select do front end
    useEffect(() => {
        const fetchLojas = async () => {
            try {
                const response = await fetch(`http://localhost:8090/api/lojas`)
                const data = await response.json()
                console.log('Dados da API: ', data)
                if (Array.isArray(data)) {
                    setLojas(data)
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
    const handleUnidadeChange = (e) => {
        const selectedOption = e.target.selectedOptions[0]
        const id = Number(selectedOption.value)
        const descricao = selectedOption.getAttribute('data-descricao')

        setUnidade(descricao)
        setIdUnidade(id)
    }


    return (
        <div >

            <h1 className={styles.title}>Cadastro Manual de Veículos<svg xmlns="http://www.w3.org/2000/svg" width="110" height="50" fill="currentColor" class="bi bi-box-arrow-in-down-right" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M6.364 2.5a.5.5 0 0 1 .5-.5H13.5A1.5 1.5 0 0 1 15 3.5v10a1.5 1.5 0 0 1-1.5 1.5h-10A1.5 1.5 0 0 1 2 13.5V6.864a.5.5 0 1 1 1 0V13.5a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5v-10a.5.5 0 0 0-.5-.5H6.864a.5.5 0 0 1-.5-.5" />
                <path fill-rule="evenodd" d="M11 10.5a.5.5 0 0 1-.5.5h-5a.5.5 0 0 1 0-1h3.793L1.146 1.854a.5.5 0 1 1 .708-.708L10 9.293V5.5a.5.5 0 0 1 1 0z" />
            </svg></h1>
            <div className={styles.container}>
                <div class="container-lg">
                    <h2>Informe os dados do veículo:</h2>
                    <div className={styles.formulario}>
                        <form className={styles.cadastro} onSubmit={handleSubmit}>
                            <label>
                                <span>Loja:</span>
                                <select type='text' name='loja' value={id_unidade} onChange={handleUnidadeChange} required >
                                    <option value="" >SELECIONE UMA LOJA</option>
                                    {lojas.map((loja) => (
                                        <option key={loja.id} value={loja.id} data-descricao={loja.descricao}>
                                            {loja.descricao}
                                        </option>
                                    ))}
                                </select>
                            </label>
                            <label>
                                <input className={styles.tag} type='hidden' value={id_unidade}></input>
                            </label>
                            <label>
                                <span>Marca:</span>
                                <input type='text' name='marca' value={marca} onChange={(e) => setMarca(e.target.value)} required></input>
                            </label>
                            <label>
                                <span>Modelo:</span>
                                <input type='text' name='modelo' value={modelo} onChange={(e) => setModelo(e.target.value)} required></input>
                            </label>
                            <label>
                                <span>Cor:</span>
                                <input className={styles.cor} type='text' name='cor' value={cor} onChange={(e) => setCor(e.target.value)} required></input>
                            </label>
                            <label>
                                <span>Ano:</span>
                                <input className={styles.ano} type='text' name='ano' value={ano} onChange={(e) => setAno(e.target.value)} required></input>
                            </label>
                            <label>
                                <span>Placa:</span>
                                <input className={styles.placa} type='text' name='placa' value={placa} onChange={(e) => setPlaca(e.target.value)} required></input>
                            </label>
                            <label>
                                <span>Tag:</span>
                                <input className={styles.tag} type='text' name='tag' maxLength={6} value={valor_meio_acesso} onChange={(e) => setValorMeioAcesso(e.target.value)} required></input>
                            </label>
                            <label>
                                <span>Renavan:</span>
                                <input type='text' name='modelo' value={renavan} onChange={(e) => setRenavan(e.target.value)} required></input>
                            </label>
                            <label>
                                <span>Status (D: Dentro/ F:Fora):</span>
                                <input className={styles.status} type='text' name='status' value={veiculo_status} onChange={(e) => setVeiculoStatus(e.target.value)} required maxLength={1}></input>
                            </label>
                            <button className={styles.cadastrar} onClick={() => setLoading} disabled={loading}>{loading ? 'Cadastrando...' : 'Cadastrar'}</button>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default CadVeicManual