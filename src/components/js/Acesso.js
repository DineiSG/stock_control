import React from 'react'
import styles from '../styles/Acesso.module.css'


const Acesso = () => {
  return (
    <div>
      <div className={styles.box}>
        <img className={styles.logo} src='/logo2.png' alt='logo' />
       

        {/*<form className={styles.form}>
            <p><svg xmlns="http://www.w3.org/2000/svg" width="140" height="80" fill="currentColor" class="bi bi-box-arrow-in-right" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0z"/>
            <path fill-rule="evenodd" d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"/>
            </svg>Login</p>
            <div className={styles.group}>
              <input required="true" className={styles.main_input} type="text" />
              <span className={styles.highlight_span}></span>
              <label className={styles.lebal_email}>CPF:</label>
            </div>
            <div className={styles.container_1}>
              <div className={styles.group}>
                <input required="true" className={styles.main_input} type="text" />
                <span className={styles.highlight_span}></span>
                <label className={styles.lebal_email}>Senha:</label>
              </div>
            </div>
            <button className={styles.submit}>Acessar</button>
          </form>*/}
      </div>
    </div>
  )
}

export default Acesso
