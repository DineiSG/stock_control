import React, { useState } from 'react'
import styles from './LoginModal.module.css'



const LoginModal = ({onClose, onLogin}) => {
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async () => {
        //Verificando as credenciais no banco de dados
        const response = await fetch('http://localhost:4000/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ login, password })
        })

        if (response.ok) {
            const data = await response.json()
            if (data.success) {
                onLogin();
            } else {
                const errorText = await response.text();
                alert(`Erro ao verificar dados de acesso: ${errorText}`)
            }
        } else {
            alert('Erro ao verificar dados de acesso')
        }
    }

    return (
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                <p className={styles.title}>Login</p>
                <input
                    type="text"
                    placeholder="Login"
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                />
                <input
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
