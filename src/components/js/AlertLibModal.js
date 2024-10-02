import styles from '../styles/StylesModal.module.css'
import { Link } from 'react-router-dom'

import React from 'react'



const AlertLibModal = ({onClose}) => {

        //Função que detecta clique fora do modal
    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div className={styles.modalOverlay} onClick={handleOverlayClick}>
            <div className={styles.modalContent}>
                <h2 className={styles.modal_title} >ATENÇÃO !!!</h2>
                <p className={styles.texto}>A solicitação de liberação de veículo por motivo de venda implica em <strong>remoção e invalidação da tag veícular</strong> <br/>resultando no <strong>impedimento do acesso do veículo às dependencias do Auto Shopping.</strong><br/> 
                Favor realizar a solicitação somente no caso de <strong>retirada definitiva</strong> do veículo por parte do cliente  <br/>
                 Neste módulo <strong>somente</strong> solicitação de liberação de veículo pelo motivo de <strong>venda</strong> pode ser realizada.<br></br> 
                Por motivo de transferência, manutenção ou outros, favor entrar em contato com a administração do Auto Shopping.</p>
                <Link to='/solic_lib_venda' ><button className={styles.btn_continuar} onClick={onClose}>Continuar</button></Link>
            </div>
        </div>
    )
}

export default AlertLibModal
