import React, { useState } from 'react'
import styles from './CadVeic.module.css'
import useInsertDataVeic from '../hooks/useInsertDataVeic'



const CadVeic = () => {
    const [loja, setLoja]=useState('')
    const [marca, setMarca]=useState('')
    const [modelo, setModelo]=useState('')
    const [cor, setCor]=useState('')
    const [ano, setAno]=useState('')
    const [placa, setPlaca]=useState('')
    const [tag, setTag]=useState('')
    const {insertDataVeic, loading, error, data} = useInsertDataVeic()

    const handleSubmit = (e) =>{
        e.preventDefault();
        insertDataVeic(loja, marca, modelo, cor, ano, placa, tag)
    }


    return (
        <div >
           
            <h1>Cadastro de Veículos<svg xmlns="http://www.w3.org/2000/svg" width="110" height="50" fill="rgba(89, 3, 110, 0.871)" class="bi bi-pencil-square" viewBox="0 0 16 16">
              <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
              <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
              </svg></h1>
            <div className={styles.container}>
                <div class="container-lg">
                    <h2>Informe os dados do veículo:</h2>
                    <div className={styles.formulario}>
                        <form className={styles.cadastro}onSubmit={handleSubmit}>
                            <label>
                                <span>Loja:</span>
                                <select className={styles.selecionar}>
                                <option >Selecione uma Loja</option>
                                <option value="1">Ton Motors</option>
                                <option value="2">Primeira Mao</option>
                                <option value="3">Three</option>
                                </select>
                            </label>
                            <label>
                                <span>Marca:</span>
                                <input type='text' name='marca' required></input>
                            </label>
                            <label>
                                <span>Modelo:</span>
                                <input type='text' name='modelo' required></input>
                            </label>
                            <label>
                                <span>Cor:</span>
                                <input type='text' name='cor' required></input>
                            </label>
                            <label>
                                <span>Ano:</span>
                                <input type='text' name='ano' required></input>
                            </label>
                            <label>
                                <span>Placa:</span>
                                <input type='text' name='placa' required></input>
                            </label>
                            <label>
                                <span>Tag:</span>
                                <input type='text' name='tag' required></input>
                            </label>
                            <button className={styles.cadastrar}>Cadastrar</button>
                        </form>
                    </div>
                </div>
            </div>
          
        </div>
    )
}

export default CadVeic
