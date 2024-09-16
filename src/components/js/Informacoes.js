import React from 'react'
import styles from '../../pages/styles/Dashboard.module.css'


const Informacoes = () => {

    return (
        <div>
            <div className={styles.carrossel} >
                <div id="carouselExampleRide" class="carousel slide"  data-bs-ride="carousel" >
                    
                    <div class="carousel-inner">
                        <div class="carousel-item active" data-bs-interval="3000">
                            <div className={styles.conteudo} >
                                <img src="/imagens/aspa.png" alt='marca' height={500} />
                            </div>
                        </div>
                        <div class="carousel-item" data-bs-interval="3000">
                            <div className={styles.conteudo} >
                                <h1>Titulo2</h1>
                            </div>
                        </div>
                        <div class="carousel-item" data-bs-interval="3000">
                            <div className={styles.conteudo} >
                                <h1>Titulo3</h1>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default Informacoes
