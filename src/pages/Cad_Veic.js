import React from 'react'
import styles from './Cad_Veic.module.css'


const Cad_Veic = () => {
  return (
    <div>
        <h1>Cadastro de Veículos</h1>
         <form className='cadastro'>
            <label>
                <span>Loja:</span>
                <input type='text'  name='loja' placeholder='Informe a loja' required></input>
            </label>
            <label>
                <span>Marca:</span>
                <input type='text'  name='marca' placeholder='Informe a marca' required></input>
            </label>
            <label>
                <span>Modelo:</span>
                <input type='text'  name='modelo' placeholder='Informe o modelo' required></input>
            </label>
            <label>
                <span>Cor:</span>
                <input type='text'  name='cor' placeholder='Informe a cor' required></input>
            </label>
            <label>
                <span>Placa:</span>
                <input type='text'  name='placa' placeholder='Informe a placa' required></input>
            </label>
            <label>
                <span>Tag:</span>
                <input className='marca' type='text'  name='tag' placeholder='Numero da tag' required></input>
            </label>
            <button className='btn'>Cadastrar</button>
        </form>   
        
    </div>
  )
}

export default Cad_Veic
