import React from 'react'
import styles from './CadLoja.module.css'
import { useState, useEffect } from 'react'




const CadLoja = () => {
    return (
        <div>
            <h1>Cadastro de Loja<svg xmlns="http://www.w3.org/2000/svg" width="110" height="50" fill="rgba(89, 3, 110, 0.871)" class="bi bi-pencil-square" viewBox="0 0 16 16">
              <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
              <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
              </svg></h1>
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
