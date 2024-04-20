import FilterDate from '../components/FilterDate'
import styles from './RelAcesso.module.css'


const RelAcesso = () => {
  return (
    <div>
      <h1>Relatório de Acessos</h1>
      <i class="bi bi-clipboard-data"></i>
      <div className="container-md">
        <div className="styles acessos">
          <FilterDate></FilterDate>
        </div>
        <div className={styles.acesso}>
          <h2>Liberação de acesso manual:</h2>
          <button type="button" className={styles.liberar} data-bs-toggle="modal" data-bs-target="#staticBackdrop">
            Entrada
          </button>
          <button type="button" className={styles.liberar} data-bs-toggle="modal" data-bs-target="#staticBackdrop">
            Saída
          </button>
          <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h1 class="modal-title fs-5" id="staticBackdropLabel">Confirmar a liberação:</h1>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  <p className={styles.aviso}>Insira sua senha para confirmar a liberação:</p>
                  <label>Senha:</label>
                  <input type="password" name='password' required />
                </div>
                <div class="modal-footer">
                  <button type="button" className={styles.confirmacao} data-bs-dismiss="modal">Confirmar</button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default RelAcesso
