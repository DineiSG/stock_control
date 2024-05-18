import FilterDate from '../components/FilterDate'
import styles from './RelAcesso.module.css'


const RelAcesso = () => {
  return (
    <div>
      <h1>Relatório de Acessos<svg xmlns="http://www.w3.org/2000/svg" width="100" height="40" fill="currentColor" class="bi bi-arrow-down-up" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M11.5 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L11 2.707V14.5a.5.5 0 0 0 .5.5m-7-14a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L4 13.293V1.5a.5.5 0 0 1 .5-.5"/>
      </svg></h1>
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
