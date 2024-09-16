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
    const [ano_modelo, setAnoModelo]=useState('')
    const [valorMeioAcesso, setValorMeioAcesso] = useState('')
    const [veiculo_status, setVeiculoStatus] = useState('')
    const [renavan, setRenavan] = useState('')
    const [loading, setLoading] = useState()
    const [lojas, setLojas] = useState([])


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

    //Função para inserir os dados no BD
    const handleSubmit = async (e) => {
        // Converte o valor decimal (em string) para o formato Wiegand
        
        const convertedValue = hexToWiegand(valorMeioAcesso);
        const valor_meio_acesso= convertedValue
        

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
            unidade, id_unidade, marca, modelo, ano, ano_modelo, cor, placa, valor_meio_acesso, veiculo_status, renavan, data_registro
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

            <h1 className={styles.title}><img width="70" height="70" src="https://img.icons8.com/3d-fluency/94/add.png" alt="add" /> Cadastro Manual de Veículos</h1>
            <div className={styles.container}>
                <div>
                    <h2 className={styles.sub_title}>Informe os dados do veículo:</h2>
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
                                <span>Ano Fab.:</span>
                                <input className={styles.ano} type='text' name='ano' value={ano} onChange={(e) => setAno(e.target.value)} required></input>
                            </label>
                            <label>
                                <span>Ano Mod.:</span>
                                <input className={styles.ano} type='text' name='ano_modelo' value={ano_modelo} onChange={(e) => setAnoModelo(e.target.value)} required></input>
                            </label>

                            <label>
                                <span>Placa:</span>
                                <input className={styles.placa} type='text' name='placa' value={placa} onChange={(e) => setPlaca(e.target.value)} required></input>
                            </label>
                            <label>
                                <span>Tag:</span>
                                <input className={styles.tag} type='text' name='tag' maxLength={6} value={valorMeioAcesso} onChange={(e) => setValorMeioAcesso(e.target.value)} required></input>
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