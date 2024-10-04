import React, { useState } from 'react'
import styles from '../styles/StylesModal.module.css'



const LoginModal = ({ onClose, onLogin }) => {
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')


    //Função que detecta clique fora do modal
    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    
    //funçao que trabalha a verificação de login
    const handleLogin = async () => {
        try {
            //Verificando as credenciais no banco de dados
            const response = await fetch(`http://192.168.1.114:4000/users`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            if (response.ok) {
                const users = await response.json();
                const user = users.find(u => u.login===login && u.password===password)
                if (user) {
                    onLogin();
                } else {
                    alert(`Dados inválidos`)
                }
            } else {
                alert('Erro ao verificar dados de acesso')
            }
        } catch {
            alert(`Erro ao tentar realizar o login.`);
        }

    }

    return (
        <div className={styles.modalOverlay} onClick={handleOverlayClick}>
            <div className={styles.modalContent}>
                <p className={styles.title}>Login</p>
                <input className={styles.parameters}
                    type="text"
                    placeholder="Login"
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                />
                <input className={styles.parameters}
                    type="password"
                    placeholder="Senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className={styles.botao} onClick={handleLogin}>Entrar</button>
                <button className={styles.botao} onClick={onClose}>Cancelar</button>
            </div>
        </div>
    )
}

export default LoginModal
