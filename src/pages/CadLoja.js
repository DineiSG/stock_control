import React from 'react'
import styles from './CadLoja.module.css'

const CadLoja = () => {
    return (
        <div>
            <h1>Cadastro de Loja</h1>
            <div className={styles.container}>
                <div class="container-lg">
                    <h2>Informe os dados da loja:</h2>
                    <div className={styles.formulario_cad}>
                        <form className={styles.cadastro_lj}>
                            <label>
                                <span>Nome:</span>
                                <input className={styles.nome} type='text' name='nome' required></input>
                            </label>
                            <label>
                                <span>Nº Box:</span>
                                <input className={styles.box} type='text' name='box' required></input>
                            </label>
                            <label>
                                <span>Tel.:</span>
                                <input type='text' name='telefone' required></input>
                            </label>
                            <label>
                                <span>E-mail:</span>
                                <input className={styles.email} type='text' name='email' required></input>
                            </label>
                            <label >
                                <span>Qtd Vagas:</span>
                                <input className={styles.vagas} type='text' name='placa' required></input>
                            </label>
                            <button className={styles.cadastrar_lj}>Cadastrar</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CadLoja
