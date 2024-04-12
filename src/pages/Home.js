import React from 'react'
import styles from './Home.module.css'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      <div class="styles.container-md">
        <div class='col-md-12'>
           <h1>Seja Bem Vindo !!!</h1>
          <div class="container text-center">
          <div class="row align-items-center">
            <div class="col">
            </div>
            <div class="col">
               <div className={styles.conteudo}>
            <div class={styles.card}>
              <div class={styles.content}>
              <Link to='/cad_veic'>
                <p>Cadastrar Veículo</p>
              </Link>
              </div>
            </div>
            <div class={styles.card}>
              <div class={styles.content}>
              <Link to='/rel_estoque'>
                <p>Relatório de Estoque</p>
              </Link>
              </div>
            </div>
            <div class={styles.card}>
              <div class={styles.content}>
              <Link to=''>
                <p>Relatório de Acessos</p>
              </Link>
              </div>
            </div>
            </div>
            </div>
            <div class="col">
            </div>
            </div>
          </div>
         
        </div>
      </div>
    </div>
  )
}

export default Home
