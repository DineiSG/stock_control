import { Link } from "react-router-dom";
import styles from "../styles/Dashboard.module.css"


const Dashboard = () => {

  return (
    <div>
      <p className={styles.p_titulo}><img width="70" height="80" src="https://img.icons8.com/3d-fluency/94/bar-chart.png" alt="bar-chart" /> Dashboard</p>
      <div className="container-md">
        <div className={styles.dash}>
          <div className="row">
            <div class="col p-3" >
              <div className={styles.link_card}>
                <Link to="/est_estoque" style={{ textDecoration: 'none' }}>
                  <p className={styles.est_title}><img width="70" height="70" src="https://img.icons8.com/3d-fluency/94/statistic.png" alt="statistic" />
                    Estoque Geral
                  </p>
                </Link>
              </div>
            </div>
            <div class="col p-3" >
              <div className={styles.link_card}>
                <Link to='/estat_marcas' style={{ textDecoration: 'none' }}>
                  <p className={styles.est_title}><img width="70" height="70" src="https://img.icons8.com/3d-fluency/94/statistic.png" alt="statistic" />
                    Estoque por Marca
                  </p>
                </Link>
              </div>
            </div>
            <div class="col p-3" >
              <div className={styles.link_card}>
                <Link to='/estat_ano_mod' style={{ textDecoration: 'none' }}>
                  <p className={styles.est_title}><img width="70" height="70" src="https://img.icons8.com/3d-fluency/94/statistic.png" alt="statistic" />
                    Estoque por Ano Modelo
                  </p>
                </Link>
              </div>
            </div>
          </div>
          <div className="row">
            <div class="col p-3" >
              <div className={styles.link_card}>
                <Link to='/estatisticas_baixas' style={{ textDecoration: 'none' }}>
                  <p className={styles.est_title}><img width="70" height="70" src="https://img.icons8.com/3d-fluency/94/statistic.png" alt="statistic" />
                    Baixas
                  </p>
                </Link>
              </div>
            </div>
            <div class="col p-3" >
              <div className={styles.link_card}>
                <Link to="/est_venda_loja" style={{ textDecoration: 'none' }}>
                  <p className={styles.est_title}><img width="70" height="70" src="https://img.icons8.com/3d-fluency/94/statistic.png" alt="statistic" />
                    Vendas Por Loja
                  </p>
                </Link>
              </div>
            </div>
            <div class="col p-3" >
              <div className={styles.link_card}>
                <Link to="/est_venda_instituicao" style={{ textDecoration: 'none' }}>
                  <p className={styles.est_title}><img width="70" height="70" src="https://img.icons8.com/3d-fluency/94/statistic.png" alt="statistic" />
                    Vendas Por Instituicao
                  </p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default Dashboard
