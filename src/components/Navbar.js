import React from 'react'
import styles from './Navbar.module.css'
import { Link } from 'react-router-dom'



const Navbar = () => {
  return (
    <nav className={styles.navbar}>
        <div className={styles.logo}>
          <img src='/logo.png' className={styles.logo} alt='Stock Control' title='Stock Control'/>
        </div>
        <div className={styles.menu}>
          <div className={styles.links}>
          <Link to='/home'>Home</Link>
          <Link to='/configuracoes'>Configurações</Link>
          </div>
          <Link to='/'><button className={styles.login}>Log In</button></Link>
          
        </div>
    </nav>
  )
}

export default Navbar
