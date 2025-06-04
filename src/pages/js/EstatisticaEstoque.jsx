import React from 'react'
import EstoqueData from '../../components/graficos/EstoqueData';
import styles from "../../components/styles/Data.module.css"


const EstatisticaEstoque = () => {
    return (
        <div>
            <p className={styles.p_titulo}><img width="70" height="70" src="https://img.icons8.com/3d-fluency/94/pie-chart.png" alt="pie-chart" /> Estoque Geral</p>
            <div class='container-md' id='printable'>
                <div className={styles.data_container}>
                    <>
                        <EstoqueData></EstoqueData>
                    </>
                </div>
            </div>
        </div>

    )
}

export default EstatisticaEstoque
