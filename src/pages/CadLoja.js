import React, { useState } from 'react'
import styles from './CadLoja.module.css'


const url = 'http://localhost:8090/api/lojas'
const CadLoja = () => {

    const [descricao, setDescricao] = useState('')
    const [box, setBox] = useState('')
    const [telefone, setTelefone] = useState('')
    const [email, setEmail] = useState('')
    const [vagas, setVagas] = useState('')
    const [loading, setLoading] = useState()



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
            descricao, box, telefone, email, vagas, dataRegistro
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
                window.alert('Loja cadastrada com sucesso!');
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


    return (
        <div>
            <h1>Cadastro de Loja<svg xmlns="http://www.w3.org/2000/svg" width="110" height="50" fill="currentColor" class="bi bi-box-arrow-in-down-right" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M6.364 2.5a.5.5 0 0 1 .5-.5H13.5A1.5 1.5 0 0 1 15 3.5v10a1.5 1.5 0 0 1-1.5 1.5h-10A1.5 1.5 0 0 1 2 13.5V6.864a.5.5 0 1 1 1 0V13.5a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5v-10a.5.5 0 0 0-.5-.5H6.864a.5.5 0 0 1-.5-.5" />
                <path fill-rule="evenodd" d="M11 10.5a.5.5 0 0 1-.5.5h-5a.5.5 0 0 1 0-1h3.793L1.146 1.854a.5.5 0 1 1 .708-.708L10 9.293V5.5a.5.5 0 0 1 1 0z" />
            </svg></h1>
            <div className={styles.container}>
                <div class="container-lg">
                    <h2>Informe os dados da loja:</h2>
                    <div className={styles.formulario_cad}>
                        <form className={styles.cadastro_lj} onSubmit={handleSubmit}>
                            <label>
                                <span>Nome:</span>
                                <input className={styles.nome} type='text' name='descricao' value={descricao} onChange={(e) => setDescricao(e.target.value)} required></input>
                            </label>

                            <label>
                                <span>Nº Box:</span>
                                <input className={styles.box} type='number' name='box' value={box} onChange={(e) => setBox(e.target.value)} required></input>
                            </label>
                            <label>
                                <span>Tel.:</span>
                                <input type='text' name='telefone' value={telefone} onChange={(e) => setTelefone(e.target.value)} required></input>
                            </label>
                            <label>
                                <span>E-mail:</span>
                                <input className={styles.email} type='text' name='email' value={email} onChange={(e) => setEmail(e.target.value)} required></input>
                            </label>
                            <label >
                                <span>Qtd Vagas:</span>
                                <input className={styles.vagas} type='text' name='vagas' value={vagas} onChange={(e) => setVagas(e.target.value)} required></input>
                            </label>
                            <button type="submit" className={styles.cadastrar_lj} onClick={() => setLoading} disabled={loading}>{loading ? 'Cadastrando...' : 'Cadastrar'}</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CadLoja
