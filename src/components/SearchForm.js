import React, { useState } from 'react'
import styles from './SearchForm.module.css'
import { useNavigate} from 'react-router-dom'


const SearchForm = () => {
    
    const navigate = useNavigate()
    const [query, setQuery]= useState()
    

    const handleSubmit = (e)=>{
        e.preventDefault()
        navigate("/search?q" + query)
    }


    return (
        <div >
            <div className={styles.container}>
                <div class="container-lg">
                    <h2>Informe o nome da loja para buscar informações:</h2>
                    <form className={styles.pesquisa} onSubmit={handleSubmit}>
                    <label>
                        <span>Loja:</span>
                       <input type='text' onChange={(e)=>setQuery(e.target.value)} required/> 
                    </label>
                    <button className={styles.buscar} type='submit'value="Buscar">Buscar</button>
                    </form>
                </div>
            </div>
            <div className={styles.container}>
                <div class="container-lg">
                    <h2>Informe a placa do veículo para buscar informações:</h2>
                    <form className={styles.pesquisa} onSubmit={handleSubmit}>
                    <label>
                        <span>Loja:</span>
                       <input type='text' onChange={(e)=>setQuery(e.target.value)} required/> 
                    </label>
                    <button className={styles.buscar} type='submit'value="Buscar">Buscar</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SearchForm
