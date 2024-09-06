import React, { useState, useEffect } from 'react'
import styles from '../styles/CadVeic.module.css'
import { Link } from 'react-router-dom'

const CadVeic = () => {
    const [veiculo, setVeiculo] = useState({
        unidade: '',
        id_unidade: '',
        marca: '',
        modelo: '',
        cor: '',
        placa: '',
        ano: '',
        ano_mod: '',
        valor_meio_acesso: '',
        veiculo_status: '',
        renavan: ''
    })
    const [unidade, setUnidade] = useState('')
    const [id_unidade, setIdUnidade] = useState('')
    const [placa, setPlaca] = useState('')
    const [valor_meio_acesso, setValorMeioAcesso] = useState('')
    const [veiculo_status, setVeiculoStatus] = useState('')
    const [loading, setLoading] = useState()
    const [lojas, setLojas] = useState([])
    


    //Esta função busca os dados do veículo na BaseBin do Denatran
    const handleBlur = async () => {
        setLoading(true);

        if (placa.length === 7) {
            // Delimitando o tempo maximo que a consulta à base bin deve levar
            const timeoutId = setTimeout(() => {
                console.log('Tempo limite excedido, recarregando a página...');
                window.alert("Tempo de requisição expirou. Clique em ok para recarregar a pagina para tentar novamente. Se preferir role para baixo e clique em Cadastro Manual para cadastrar sem consultar a Base BIN. " )  
                window.location.reload();
            }, 10000);

            try {
                const response = await fetch(`http://localhost:8090/api/veiculos/dados?placa=${placa}`);
                if (response.ok) {
                    const data = await response.json();
                    setVeiculo({
                        ...veiculo,
                        Fabricante: data.Fabricante,
                        MarcaModelo: data.MarcaModelo,
                        CorVeiculo: data.CorVeiculo,
                        AnoFabricacao: data.AnoFabricacao,
                        AnoModelo: data.AnoModelo,
                        renavam: data.renavam
                    });
                    console.log(data)
                    await new Promise(resolve => setTimeout(resolve, 1000));
                    
                } else {
                    console.error('Erro ao buscar dados do veículo');
                    window.alert(console.error())

                }
            } catch (error) {
                console.error('Erro na requisição', error);
            } finally {
                clearTimeout(timeoutId)
                
                setLoading(false); // Desativa o spinner
                
            }
        }
    };

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
            unidade, id_unidade, marca: veiculo.Fabricante, modelo: veiculo.MarcaModelo, ano: veiculo.AnoFabricacao, ano_mod: veiculo.AnoModelo, cor: veiculo.CorVeiculo, placa, valor_meio_acesso, veiculo_status, renavan: veiculo.renavam, data_registro
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
            const response = await fetch('http://localhost:8090/api/veiculos', {
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
                //console.log('Dados da API: ', data)
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

            <h1><img width="70" height="70" src="https://img.icons8.com/3d-fluency/94/add.png" alt="add"/> Cadastro de Veículos</h1>
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
                                <span>Placa:</span>
                                <input className={styles.placa} type='text' name='placa' value={placa} onChange={(e) => setPlaca(e.target.value)} onBlur={handleBlur} required></input>

                            </label>
                            {loading && <div class="spinner-border spinner-border-sm" role="status" ></div>}
                            <label>
                                <span>Marca:</span>
                                <input type='text' name='marca' value={veiculo.Fabricante} readOnly required></input>
                            </label>
                            <label>
                                <span>Modelo:</span>
                                <input type='text' name='modelo' value={veiculo.MarcaModelo} readOnly required></input>
                            </label>
                            <label>
                                <span>Cor:</span>
                                <input className={styles.cor} type='text' name='cor' value={veiculo.CorVeiculo} readOnly required></input>
                            </label>
                            <label>
                                <span>Ano Fab.:</span>
                                <input className={styles.ano} type='text' name='ano' value={veiculo.AnoFabricacao} readOnly required></input>
                            </label>
                            <label>
                                <span>Ano Mod:</span>
                                <input className={styles.ano} type='text' name='ano_mod' value={veiculo.AnoModelo} readOnly required></input>
                            </label>
                            <label>
                                <span>Renavan:</span>
                                <input type='text' name='renavan' value={veiculo.renavam} readOnly required></input>
                            </label>
                            <label>
                                <span>Tag:</span>
                                <input className={styles.tag} type='text' name='tag' maxLength={6} value={valor_meio_acesso} onChange={(e) => setValorMeioAcesso(e.target.value)} required></input>
                            </label>

                            <label>
                                <span>Status (D: Dentro/ F:Fora):</span>
                                <input className={styles.status} type='text' name='status' value={veiculo_status} onChange={(e) => setVeiculoStatus(e.target.value)} required maxLength={1}></input>
                            </label>
                            <button className={styles.cadastrar} onClick={() => setLoading} disabled={loading}>{loading ? 'Buscando Dados...' : 'Cadastrar'}</button>
                        </form>
                    </div>
                </div>

            </div>
            <div>
                <Link to='/cadastro_manual'><button className={styles.btn_cad_manual} >Cadastro Manual</button></Link>
            </div>
        </div>
    )
}

export default CadVeic
