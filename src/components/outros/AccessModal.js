import React, { useState } from 'react'
import styles from '../styles/StylesModal.module.css'


const AccessModal = () => {

    const [credentials, setCredentials] = useState({ login: '', senha: '' })
    const [showSenha, setShowSenha] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target
        setCredentials({ ...credentials, [name]: value })
    }


    //funçao que trabalha a verificação de login
    const handleLogin = async () => {
        try {
            const response = await fetch(`http://localhost:8091/api/v1/usuario/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(credentials),
            })
            if (!response.ok) {
                const errorData = await response.json();
                console.log(errorData)
                throw new Error(errorData.message || 'Credenciais inválidas');
            }

            const data = await response.json()
            console.log(data)

            if (!data.token) {
                throw new Error('Token não recebido. Verifique o backend.');
            }

            localStorage.setItem('token', data.token)

            window.location.href = '/home'
        } catch (error) {
            console.error('Erro ao tentar realizar o login:', error);
            alert('Usuário ou senha incorretos!');
        }

    }



    return (
        <div className={styles.modalOverlay}>
            <div className={styles.AccessModalContent} >
                <form className={styles.accessLogin} onSubmit={(e) => { e.preventDefault(); handleLogin() }}>
                    <img className={styles.logo} src='/logo2.png' alt='logo' height={200} />
                    <p className={styles.accessTitle}>Login</p>
                    <input className={styles.accessParameters} type="text" name="login" placeholder="Login" value={credentials.login} onChange={handleChange} />
                    <input className={styles.accessParameters} type={showSenha ? "text" : "password"} maxLength={8} name="senha" placeholder="Senha" value={credentials.senha} onChange={handleChange} />
                    <buttom className={styles.botao}  type="buttom" onClick={() => setShowSenha(!showSenha)}
                        style={{ position: 'relative', left: '20px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', }} title='Visualizar senha' >
                        {showSenha ? <img width="30" height="30" src="https://img.icons8.com/carbon-copy/30/hide.png" alt="hide" /> :
                            <img width="30" height="30" src="https://img.icons8.com/external-icongeek26-outline-icongeek26/64/external-Eye-content-edition-icongeek26-outline-icongeek26.png" alt="external-Eye-content-edition-icongeek26-outline-icongeek26" />}
                    </buttom>
                    <button className={styles.botao} type="submit" onClick={() => handleLogin()}>ENTRAR</button>
                    <button className={styles.botao} onClick={() => window.location.href = '/'}>CANCELAR</button>
                </form>
            </div>
        </div>
    )
}

export default AccessModal
