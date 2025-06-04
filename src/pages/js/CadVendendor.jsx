import { useState, useEffect } from 'react'
import styles from '../../components/styles/Lojista.module.css'

const CadVendendor = () => {
    const [nome, setNome] = useState('')
    const [telefone, setTelefone] = useState('')
    const [email, setEmail] = useState('')
    const [unidade, setUnidade] = useState('')
    const [loading, setLoading] = useState('')
    const [id_unidade, setIdUnidade] = useState('')
    const [lojas, setLojas] = useState([])



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
        const dataRegistro = formatTimestamp(new Date());

        e.preventDefault()
        const payload = {
            unidade, telefone, email, nome, dataRegistro
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
            const response = await fetch('http://localhost:8090/api/v1/vendedor', {
                method: 'POST',
                headers: {
                    
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(upperCasePayload),
            })
            if (response.ok) {
                console.log('Cadastro realizado com sucesso!')
                window.alert('Vendedor cadastrado com sucesso!');
                window.location.reload();
            } else {
                console.log('Erro ao enviar os dados')
                window.alert('Erro ao realizar o cadastro. Tente novamente.');
            }
        } catch (error) {
            window.alert('Erro ao realizar o cadastro. Tente novamente.');
        } finally {
            window.location.reload();
        }
    }

    //Buscando lojas para preencher o select do front end
    useEffect(() => {
        const fetchLojas = async () => {
            try {
                const response = await fetch(`http://localhost:8090/api/v1/lojas`)
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
        <div>
            <h1><img width="70" height="70" src="https://img.icons8.com/3d-fluency/94/add.png" alt="add" />Cadastro de Vendedor</h1>
            <div className={styles.container1}>
                <div class="container-lg">
                    <h2 className={styles.title}>INFORME OS DADOS DO VENDEDOR:</h2>
                    <div className={styles.formulario_cad}>
                        <form className={styles.cadastro_lj} onSubmit={handleSubmit}>
                            <label>
                                <p>Nome Completo:</p>
                                <input className={styles.nome} type='text' name='nome' value={nome} onChange={(e) => setNome(e.target.value)} required></input>
                            </label>
                            <label>
                                <p>Tel.:</p>
                                <input type='text' name='telefone' value={telefone} onChange={(e) => setTelefone(e.target.value)} required></input>
                            </label>
                            <label>
                                <p>E-mail:</p>
                                <input className={styles.email} type='text' name='email' value={email} onChange={(e) => setEmail(e.target.value)} required></input>
                            </label>
                            <label>
                                <p>Loja:</p>
                                <select type='text' name='unidade' value={id_unidade} onChange={handleUnidadeChange} required >
                                    <option value="" >SELECIONE UMA LOJA</option>
                                    {lojas.map((loja) => (
                                        <option key={loja.id} value={loja.id} data-descricao={loja.descricao}>
                                            {loja.descricao}
                                        </option>
                                    ))}
                                </select>
                            </label>
                            <button type="submit" className={styles.btn_cadastrar} onClick={() => setLoading} disabled={loading}>{loading ? 'Cadastrando...' : 'Cadastrar'}</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CadVendendor
