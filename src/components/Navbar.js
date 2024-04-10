import React from 'react'
import styles from './Navbar.module.css'
import { Link } from 'react-router-dom'



const Navbar = () => {
  return (
    <nav className={styles.navbar}>
        <div class={styles.logo}>
          <img src='/logo.png' className={styles.logo}/>
        </div>
        <div className={styles.menu}>
          <div className={styles.links}>
          <Link to='/'>Home</Link>
          </div>
          <button className={styles.login}>Log In</button>
        </div>
    </nav>
  )
}

export default Navbar
