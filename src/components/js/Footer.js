import React from 'react'
import styles from '../styles/Footer.module.css'

const Footer = () => {
  return (
    <div>
      <footer className={styles.footer}>
        <span><p>&copy; 2024 Auto Shopping</p></span>
        <p className={styles.api_version}>Versao da API: 1.1.3</p>
      </footer>
    </div>
  )
}

export default Footer
