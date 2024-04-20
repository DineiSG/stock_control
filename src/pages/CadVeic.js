import React from 'react'
import styles from './CadVeic.module.css'


const CadVeic = () => {
    return (
        <div >
            <h1>Cadastro de Veículos</h1>
            <div className={styles.container}>
                <div class="container-lg">
                    <h2>Informe os dados do veículo:</h2>
                    <div className={styles.formulario}>
                        <form className={styles.cadastro}>
                            <label>
                                <span>Loja:</span>
                                <input type='text' name='loja' required></input>
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
                                <span>Placa:</span>
                                <input type='text' name='placa' required></input>
                            </label>
                            <label>
                                <span>Tag:</span>
                                <input className='marca' type='text' name='tag' required></input>
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
