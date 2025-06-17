import React, { useState } from 'react'
import styles from '../styles/CadLoja.module.css'


const CadLoja = () => {

    const [descricao, setDescricao] = useState('')
    const [telefone, setTelefone] = useState('')
    const [email, setEmail] = useState('')
    const [vagas, setVagas]=useState("1000")
    const [qtdVeiculos, setQtdVeiculos] = useState('')
    const [loading, setLoading] = useState()



    const handleSubmit = async (e) => {
        /*Função que trata da inserção de data de forma automática
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
        const dataRegistro = formatTimestamp(new Date()); */

        e.preventDefault()
        const payload = {
            descricao, telefone, email, qtdVeiculos, vagas
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
            const response = await fetch('http://localhost:8090/api/v1/lojas', {
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
            <h1><img width="70" height="70" src="https://img.icons8.com/3d-fluency/94/add.png" alt="add"/>Cadastro de Loja</h1>
            <div className={styles.container}>
                <div class="container-lg">
                    <h2 className={styles.title}>INFORME OS DADOS DA LOJA:</h2>
                    <div className={styles.formulario_cad}>
                        <form className={styles.cadastro_lj} onSubmit={handleSubmit}>
                            <label>
                                <p>Nome:</p>
                                <input className={styles.nome} type='text' name='descricao' value={descricao} onChange={(e) => setDescricao(e.target.value)} required></input>
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
                                <p>Qtd Vagas:</p>
                                <input className={styles.vagas} type='text' name='qtdVeiculos' value={qtdVeiculos} onChange={(e) => setQtdVeiculos(e.target.value)} required></input>
                            </label>
                            <label>
                                
                                <input className={styles.vagas} type='hidden' name='vagas' value={vagas} onChange={(e) => setVagas(e.target.value)} required></input>
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
