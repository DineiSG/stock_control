import React from 'react'
import styles from './Acesso.module.css'

const Acesso = () => {
  return (
    <div>
      <div className='container-md'>
        <img className={styles.logo} src='/logo2.png' alt='logo'/>
        <form className={styles.form}>
          <p>Login</p>
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
        </form>
      </div>
    </div>
  )
}

export default Acesso
