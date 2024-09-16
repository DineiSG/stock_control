import styles from '../styles/Dashboard.module.css'
import Informacoes from '../../components/js/Informacoes'
import { useEffect } from 'react';

const Dashboard = () => {




return (
  <div >
    <div className={styles.dash_box} >
      <div className={styles.top_marcas} >
        <Informacoes></Informacoes>
      </div>
    </div>
  </div>
)
}

export default Dashboard
