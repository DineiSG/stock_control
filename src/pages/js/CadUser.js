import styles from '../../pages/styles/CadVeic.module.css'
import React, { useState, useEffect } from 'react'


const CadUser = () => {

    const [loading, setLoading] = useState('')
    const [senha, setSenha] = useState('')
    const [confirmSenha, setConfirmSenha] = useState('')
    const [idUnidade, setIdUnidade] = useState('')
    const [tipo, setTipo] = useState('')
    const [errorFront, setErrorFront] = useState("")
    const [nome, setNome] = useState('')
    const [unidade, setUnidade] = useState('')
    const [email, setEmail] = useState('')
    const [login, setLogin] = useState('')
    const [lojas, setLojas] = useState([])
    const [ativo, setAtivo] = useState(true)
    const [showSenha, setShowSenha] = useState(false)
    const [showRegras, setShowRegras] = useState(false)



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

        //validando a senha
        if (senha !== confirmSenha) {
            setErrorFront("As senhas precisam ser iguais!")
            return
        }

        e.preventDefault()
        const dados = {
            data_registro,
            unidade: unidade.toUpperCase(),
            nome: nome.toUpperCase(),
            email,
            login,
            senha,
            ativo,
            tipo
        }

        try {
            
            const response = await fetch('http://localhost:8091/api/v1/usuario/create-user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dados),
            })
            if (response.ok) {
                console.log('Cadastro de usuário realizado com sucesso!')
                window.alert('Cadastro de usuário realizado com sucesso!');
                window.location.reload();
            } else {
                console.log('Erro ao enviar os dados')
            }
        } catch (error) {
            console.log('Erro ao realizar o cadastro. Tente novamente.', error);
        }
    }

    //Buscando as lojas
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

    const handleUnidadeChange = (e) => {
        const selectedOption = e.target.selectedOptions[0]
        const id = Number(selectedOption.value)
        const descricao = selectedOption.getAttribute('data-descricao')

        setUnidade(descricao)
        setIdUnidade(id)
    }


    return (
        <div>
            <h1><img width="70" height="70" src="https://img.icons8.com/3d-fluency/94/add.png" alt="add" />Cadastrar Novo Usuário</h1>
            <div className={styles.container}>
                <div className="container-sm">
                    <h2 className={styles.title}>INFORME OS DADOS DO USUARIO </h2>
                    <div className={styles.formulario}>
                        <form className={styles.cadastro} onSubmit={handleSubmit}>
                            <label>
                                <p>Tipo de Usuário:</p>
                                <select type="text" name="tipo" value={tipo} onChange={(e) => setTipo(e.target.value)}>
                                    <option value="">SELECIONE UMA OPÇÃO</option>
                                    <option >ADMINISTRADOR</option>
                                    <option >LOJISTA</option>
                                    <option >COLABORADOR</option>
                                </select>
                            </label>
                            <label>
                                <p>Loja:</p>
                                <select type='text' name='loja' value={idUnidade} onChange={handleUnidadeChange} required >
                                    <option value="" >SELECIONE UMA LOJA</option>
                                    {lojas.map((loja) => (
                                        <option key={loja.id} value={loja.id} data-descricao={loja.descricao}>
                                            {loja.descricao}
                                        </option>
                                    ))}
                                </select>
                            </label>
                            <label>
                                <p>Nome Completo:</p>
                                <input className={styles.name} type="text" name='nome' value={nome} maxLength={30} onChange={(e) => setNome(e.target.value)} required />
                            </label>
                            <label>
                                <p>CPF:</p>
                                <input type="text" name='login' placeholder='Somente numeros' value={login} maxLength={15} required onChange={(e) => setLogin(e.target.value)} />
                            </label>
                            <label>
                                <p>Email:</p>
                                <input className={styles.name} type="email" name='email' placeholder='@' value={email} onChange={(e) => setEmail(e.target.value)} required />
                            </label>
                            <input type='hidden' name='ativo' value={ativo} onChange={(e) => setAtivo(e.target.value)} />
                            <div style={{ position: 'relative', display: 'inline', widith: 400 }}>
                                <label>
                                    <p>Senha:</p>
                                    <input type={showSenha ? "text" : "password"} name='senha' maxLength={8} value={senha} onChange={(e) => setSenha(e.target.value)} onFocus={() => setShowRegras} onBlur={() => setShowRegras} required />
                                    <buttom type="buttom" onClick={() => setShowSenha(!showSenha)}
                                        style={{ position: 'relative', left: '20px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', }} title='Visualizar senha' >
                                        {showSenha ? <img width="30" height="30" src="https://img.icons8.com/carbon-copy/30/hide.png" alt="hide" /> :
                                            <img width="30" height="30" src="https://img.icons8.com/external-icongeek26-outline-icongeek26/64/external-Eye-content-edition-icongeek26-outline-icongeek26.png" alt="external-Eye-content-edition-icongeek26-outline-icongeek26" />}
                                    </buttom>
                                </label>
                                <label>
                                    <p>Confirme a Senha:</p>
                                    <input type="password" name='confirm_password' maxLength={8} value={confirmSenha} onChange={(e) => setConfirmSenha(e.target.value)} required />
                                </label>
                                <button className={styles.cadastrar} onClick={() => setLoading} disabled={senha !== confirmSenha} tipe="submit" >{loading ? 'Cadastrando...' : 'Cadastrar'} </button>

                                {senha !== confirmSenha && confirmSenha && (
                                    <p style={{ color: 'red', fontSize: '16px', fontWeight: 'bold' }} >Atenção: As senhas nao coincidem!</p>
                                )}
                                {errorFront && <p className='error'>{errorFront}</p>}
                            </div>
                            <label>

                            </label>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CadUser
