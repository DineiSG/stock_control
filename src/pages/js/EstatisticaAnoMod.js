import React from 'react'
import styles from "../../components/styles/Data.module.css"
import AnoMod from '../../components/graficos/AnoMod'

const EstatisticaAnoMod = () => {
    return (
        <div>
            <p className={styles.p_titulo}><img width="70" height="70" src="https://img.icons8.com/3d-fluency/94/bar-chart.png" alt="bar-chart"/> Estoque Por Ano Modelo</p>
            <div class='container-md' id='printable'>
                <div className={styles.data_container}>
                    <>
                        <AnoMod></AnoMod>
                    </>
                </div>
            </div>

        </div>
    )
}

export default EstatisticaAnoMod
