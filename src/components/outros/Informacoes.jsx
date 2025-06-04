import { useEffect } from 'react'
import styles from '../../pages/styles/Dashboard.module.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'


const Informacoes = () => {

    useEffect(() => {
        const carrossel = document.querySelector('#carouselExampleRide')
        if (carrossel) {
            const bootstrapCarrossel = new window.bootstrap.Carousel(carrossel, {
                interval: 5000,
                ride: 'carousel'
            })
        }
    }, [])


    return (
        <div>
            <div class='container-sm'>
            <div className={styles.carrossel} >
                <div id="carouselExampleRide" class="carousel slide" data-bs-ride="carousel" >
                   
                        <div class="carousel-inner">
                            <div class="carousel-item active" >
                                <div className={styles.conteudo} >
                                    <img className={styles.imagens} src="/imagens/aspa.png" alt='Auto Shopping' height={400} width={900}/>
                                </div>
                            </div>
                            <div class="carousel-item" >
                                <div className={styles.conteudo} >
                                    <img className={styles.imagens} src="/imagens/volkswagen.png" alt='Volkswagen' height={400} width={400} />
                                </div>
                            </div>
                            <div class="carousel-item" >
                                <div className={styles.conteudo} >
                                <img className={styles.imagens} src="/imagens/ford.png" alt='Ford' height={500} width={500}  />
                                </div>
                            </div>
                            <div class="carousel-item" >
                                <div className={styles.conteudo} >
                                <img className={styles.imagens} src="/imagens/gm.png" alt='GM' height={400} width={600}  />
                                </div>
                            </div>
                            <div class="carousel-item" >
                                <div className={styles.conteudo} >
                                <img className={styles.imagens} src="/imagens/fiat.png" alt='Fiat' height={500} width={500} />
                                </div>
                            </div>
                            <div class="carousel-item" >
                                <div className={styles.conteudo} >
                                <img className={styles.imagens} src="/imagens/chevrolet.png" alt='Chevrolet' height={400} width={800} />
                                </div>
                            </div>
                            <div class="carousel-item" >
                                <div className={styles.conteudo} >
                                <img className={styles.imagens} src="/imagens/toyota.png" alt='Toyota' height={400} width={900}  />
                                </div>
                            </div>
                            <div class="carousel-item" >
                                <div className={styles.conteudo} >
                                <img className={styles.imagens} src="/imagens/honda.png" alt='Honda' height={400} width={400}  />
                                </div>
                            </div>
                            <div class="carousel-item" >
                                <div className={styles.conteudo} >
                                <img className={styles.imagens} src="/imagens/hyundai.png" alt='Hyundai' height={500} width={600}  />
                                </div>
                            </div>
                            <div class="carousel-item" >
                                <div className={styles.conteudo} >
                                <img className={styles.imagens} src="/imagens/nissan.png" alt='Nissan' height={500} width={500} />
                                </div>
                            </div>
                            <div class="carousel-item" >
                                <div className={styles.conteudo} >
                                <img className={styles.imagens} src="/imagens/kia.png" alt='Kia' height={400} width={500} />
                                </div>
                            </div>
                            <div class="carousel-item" >
                                <div className={styles.conteudo} >
                                <img className={styles.imagens} src="/imagens/volvo.png" alt='Volvo' height={500} width={800}  />
                                </div>
                            </div>
                            <div class="carousel-item" >
                                <div className={styles.conteudo} >
                                <img className={styles.imagens} src="/imagens/jeep.png" alt='Jeep' height={500} width={500}  />
                                </div>
                            </div>
                            <div class="carousel-item" >
                                <div className={styles.conteudo} >
                                <img className={styles.imagens} src="/imagens/peugeot.png" alt='Peugeot' height={400} width={400} />
                                </div>
                            </div>
                            <div class="carousel-item" >
                                <div className={styles.conteudo} >
                                <img className={styles.imagens} src="/imagens/renault.png" alt='Renault' height={500} width={500}  />
                                </div>
                            </div>
                            <div class="carousel-item" >
                                <div className={styles.conteudo} >
                                <img className={styles.imagens} src="/imagens/citroen.png" alt='Citroen' height={500} width={500}  />
                                </div>
                            </div>
                            <div class="carousel-item" >
                                <div className={styles.conteudo} >
                                <img className={styles.imagens} src="/imagens/bmw.png" alt='BMW' height={500} width={800}/>
                                </div>
                            </div>
                            <div class="carousel-item" >
                                <div className={styles.conteudo} >
                                <img className={styles.imagens} src="/imagens/mercedes.png" alt='Mercedes' height={400} width={800}  />
                                </div>
                            </div>
                            <div class="carousel-item" >
                                <div className={styles.conteudo} >
                                <img className={styles.imagens} src="/imagens/audi.png" alt='Audi' height={400} width={600} />
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Informacoes
