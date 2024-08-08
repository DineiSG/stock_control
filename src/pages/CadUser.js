import styles from './CadUser.module.css'


const CadUser = () => {
    return (
        <div>
            <h1>Cadastrar Novo Usuário<svg xmlns="http://www.w3.org/2000/svg" width="110" height="50" fill="currentColor" class="bi bi-person-plus-fill" viewBox="0 0 16 16">
                <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                <path fill-rule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5" />
            </svg></h1>
            <div className="container-md">
                <div className={styles.formulario}>
                    <div class={styles.formcad_title}>
                        <h2><svg xmlns="http://www.w3.org/2000/svg" width="90" height="40" fill="currentColor" class="bi bi-person-plus-fill" viewBox="0 0 16 16">
                            <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                            <path fill-rule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5" />
                        </svg>Informe os Dados
                        </h2>
                    </div>
                    <form>
                        <label>Nome Completo:</label>
                        <input type="text" name='nome' required></input>
                        <label>Email:</label>
                        <input type="text" name='nome' required></input>
                        <label>CPF:</label>
                        <input type="text" name='nome' required></input>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CadUser
