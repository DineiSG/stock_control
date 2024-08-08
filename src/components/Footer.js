import React from 'react'
import styles from './Footer.module.css'

const Footer = () => {
  return (
    <div>
      <footer className={styles.footer}>
        <span><p>&copy; 2024 Auto Shopping</p></span>

        <p>Versao da API: 1.0.0</p>
      </footer>
    </div>
  )
}

export default Footer
