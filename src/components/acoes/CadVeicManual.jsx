import React, { useState, useEffect } from 'react'
import styles from '../../pages/styles/CadVeic.module.css'



const CadVeicManual = () => {
    const [unidade, setUnidade] = useState('')
    const [marca, setMarca] = useState('')
    const [modelo, setModelo] = useState('')
    const [cor, setCor] = useState('')
    const [placa, setPlaca] = useState('')
    const [ano_fabricacao, setAnoFabricacao] = useState('')
    const [ano_modelo, setAnoModelo] = useState('')
    const [renavan, setRenavan] = useState('')
    const [fipe, setFipe] = useState('')
    const [loading, setLoading] = useState()
    const [lojas, setLojas] = useState([])


    //Função de conversao Hexadecimal para Wiegand. Essa função recebe o valor da tag em Hexadecimal e converte para Wiegand,
    // que e um formato muito utilizado em controle de acessos.
    /*function hexToWiegand(hexValue) {
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
    }*/



    //Função para inserir os dados no BD
    const handleSubmit = async (e) => {
        // Converte o valor decimal (em string) para o formato Wiegand

        /*const convertedValue = hexToWiegand(tag);
        const valorMeioAcesso = convertedValue*/



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
            unidade, marca, modelo, ano_fabricacao, ano_modelo, cor, placa, renavan, data_registro, fipe
        }
        //Alterando os valores informados no input para lertas maiusculas
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
            /*---------------------------Fazendo a verificação das vagas disponiveis */
            const responseUnidade = await fetch(`http://localhost:8090/api/v1/veiculos/unidade/${unidade}`)
            const data = await responseUnidade.json()

            const filteredResults = data.filter(veiculo => veiculo.valorMeioAcesso !== '').length;
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
                const response = await fetch('http://localhost:8090/api/v1/veiculos', {
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
                    if (placa !== "") {
                        window.alert('Não foi possível realizar o cadastro do veículo. O a placa informada já está cadastrada. Verifique a placa e tente novamente.');
                    }
                    window.location.reload();
                }
            } else {
                window.alert("Nao há vagas disponíveis para novos cadastros nesta loja. O veículo nao pode ser cadastrado.")
            }
        } catch (error) {
            console.log('Erro ao realizar o cadastro. Tente novamente.', error);
        } finally {
        }
    }



    /*const handleBlur = async () => {
        if (tag !== '') {
            console.log('Nº da tag para leitura: ' + hexToWiegand(tag))
        }
    }*/

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
    const handleUnidadeChange = (e) => {
        const selectedOption = e.target.selectedOptions[0]
        const id = Number(selectedOption.value)
        const descricao = selectedOption.getAttribute('data-descricao')

        setUnidade(descricao)
    }


    return (
        <div>
            <h1 ><img width="70" height="70" src="https://img.icons8.com/3d-fluency/94/add.png" alt="add" /> Cadastro de Veículos S/ BIN</h1>
            <div className={styles.container}>
                <div class="container-sm">
                    <h2 className={styles.title}>INFORME OS DADOS DO VEÍCULO:</h2>
                    <div className={styles.formulario}>
                        <form className={styles.cadastro} onSubmit={handleSubmit}>
                            <label>
                                <p>Loja:</p>
                                <select type='text' name='loja' value={unidade} onChange={handleUnidadeChange} required >
                                    <option value="" >SELECIONE UMA LOJA</option>
                                    {lojas.map((loja) => (
                                        <option key={loja.descricao} value={loja.descricao} data-descricao={loja.descricao}>
                                            {loja.descricao}
                                        </option>
                                    ))}
                                </select>
                            </label>
                            <label>
                                <p>Marca:</p>
                                <input type='text' name='marca' value={marca} onChange={(e) => setMarca(e.target.value)} required></input>
                            </label>
                            <label>
                                <p>Modelo:</p>
                                <input type='text' name='modelo' value={modelo} onChange={(e) => setModelo(e.target.value)} required></input>
                            </label>
                            <label>
                                <p>Cor:</p>
                                <input className={styles.cor} type='text' name='cor' value={cor} onChange={(e) => setCor(e.target.value)} required></input>
                            </label>
                            <label>
                                <p>Ano Fab.:</p>
                                <input className={styles.ano} type='text' name='ano_fabricacao' value={ano_fabricacao} onChange={(e) => setAnoFabricacao(e.target.value)} maxLength={4} required></input>
                            </label>
                            <label>
                                <p>Ano Mod.:</p>
                                <input className={styles.ano} type='text' name='ano_modelo' value={ano_modelo} onChange={(e) => setAnoModelo(e.target.value)} maxLength={4} required></input>
                            </label>
                            <label>
                                <p>Placa:</p>
                                <input className={styles.placa} type='text' name='placa' value={placa} maxLength={7} onChange={(e) => setPlaca(e.target.value)} required></input>
                            </label>
                            <label>
                                <p>Renavam:</p>
                                <input type='text' name='modelo' value={renavan} onChange={(e) => setRenavan(e.target.value)} required></input>
                            </label>
                            <label>
                                <p>Valor FIPE R$:</p>
                                <input type='text' name='fipe' value={fipe} onChange={(e) => setFipe(e.target.value)} required></input>
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