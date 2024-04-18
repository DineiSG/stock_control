import React from 'react'
import styles from './FilterDate.module.css'

const FilterDate = () => {
  return (
    <div>
        <div className="container">
        <h2>Informe o período:</h2>
        <form className={styles.periodo}>
            <label>
                Data Inicial:
            </label>    
                <input type="date" className={styles.inicio} />
            <label>
                Data Final:
            </label>  
                <input type="date" className={styles.fim} />
        </form>
        </div>
      
    </div>
  )
}

export default FilterDate
