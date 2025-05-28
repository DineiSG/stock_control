import styles from '../styles/Navbar.module.css'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import LoginModal from '../outros/LoginModal'
import AlertLibModal from './AlertLibModal'



const Navbar = () => {
  const location = useLocation()
  const isHome = location.pathname === '/home'
  const isContratoPage = location.pathname === '/contrato'
  const [alertModalOpen, setAletModalOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [redirectPath, setRedirectPath] = useState('')
  const navigate = useNavigate()
  const [isMenuVisible, setIsMenuVisible] = useState(false)
  const [iconVisible, setIconVisible] = useState(false)


  //* Função para deslogar usuario
  const handleLogout = () => {
    //* Remover o token de autenticação
    sessionStorage.clear()

    window.close(localStorage.clear())

    //* Redirecionando para a pagina de login
    navigate('/')
  }



  //* Função que altera a visibilidade do menu
  const handleMenu = () => {
    setIsMenuVisible(!isMenuVisible)
  }

  //* Esconde o ícone quando a URL muda
  useEffect(() => {
    if (location.pathname !== '/') {
      setIconVisible(false)//* Oculta o ícone quando sair da página "acesso"
      setIsMenuVisible(true)//* Garante que o menu permaneça visível após a navegação
    } else {
      setIconVisible(true)//* Exibe o ícone quando estiver na página "acesso"
      setIsMenuVisible(false)//* Esconde o menu inicialmente
    }
  }, [location])

  const handleModalAlertOpen = () => {
    setAletModalOpen(true)
  }
  const handleModalAlertClose = () => {
    setAletModalOpen(false)
  }

  const handleOpenModal = (path) => {
    setRedirectPath(path);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleLoginSuccess = () => {
    setIsModalOpen(false);
    navigate(redirectPath); //* Redireciona para a página desejada após o login
  };

  return (
    <div className={styles.modalOverlay}>

      {!isContratoPage && (
        <nav className={styles.navbar} id="navbar">



          {isMenuVisible && (
            <div className={styles.menu}>
              <div className={styles.navItem}>
                <div className={styles.burger} id="dropdown5">
                  <img width="50" height="50" src="https://img.icons8.com/3d-fluency/94/menu.png" alt="menu" />

                  <ul className={styles.dropdownMenu} >
                    <li><Link to='/home' className={styles.dropdown}>Home</Link></li>
                    <p className={styles.nav}>LOJISTA</p>
                    <li><Link to='com_vendas' className={styles.dropdown}>Comunicação de Venda</Link></li>
                    <li><button onClick={() => handleModalAlertOpen('/solic_lib_venda')} className={styles.dropdown}> Solicitar Liberação</button></li>
                    <li><Link to='cad_vendedor' className={styles.dropdown}>Cadastro de Vendedor</Link></li>
                    <li><Link to='cons_venda' className={styles.dropdown}>Consultar Venda</Link></li>
                    {/*<li><Link to='/contrato' className={styles.dropdown}>Contrato</Link></li>*/}
                    <p className={styles.nav}>GESTÃO DE ESTOQUE</p>
                    <li><Link to='cad_veic' className={styles.dropdown}>Cad. Veiculo BIN</Link></li>
                    <li><Link to='cadastro_manual' className={styles.dropdown}>Cad. Veiculo S/ BIN</Link></li>
                    <li><Link to='cad_loja' className={styles.dropdown}>Cad. Loja</Link></li>
                    <li><Link to='/inventario' className={styles.dropdown}>Inventário</Link> </li>
                    <li><Link to='/buscas' className={styles.dropdown} i>Pesquisar</Link></li>
                    <p className={styles.nav}>ADMINISTRAÇÃO</p>
                    <li><button onClick={() => handleOpenModal('/liberacoes')} className={styles.dropdown}>Liberar Veículo</button></li>
                    <li><button onClick={() => handleOpenModal('/baixar_veic')} className={styles.dropdown}>Baixar Veículo</button></li>
                    <li><button onClick={() => handleOpenModal('/cad_user')} className={styles.dropdown}>Cad. Usuário</button></li>
                    <li><Link to='relatorio_estoque' className={styles.dropdown}>Relatórios</Link></li>
                    <li><Link to='dashboard' className={styles.dropdown}>Dashboard</Link></li>

                  </ul>
                  {alertModalOpen && <AlertLibModal onClose={handleModalAlertClose} />}
                  {isModalOpen && (
                    <LoginModal onClose={handleCloseModal} onLogin={handleLoginSuccess} />
                  )}
                </div>
              </div>
              <div className={styles.btn_house} alt='Home' title='Ir para home'>
                <Link to='/home'><img width="50" height="50" src="https://img.icons8.com/3d-fluency/94/home.png" alt="home" /></Link>
              </div>

              {isHome && (
                <div className={styles.btn_lock}>
                  <img width="50" height="50" src="https://img.icons8.com/3d-fluency/94/lock-2.png" alt="lock-2" title="Logout" onClick={handleLogout} />
                </div>
              )}
            </div>
          )}
          {iconVisible && (
            <div className={styles.btn_door}>
              <Link to='/home'><img width="50" height="50" src="https://img.icons8.com/3d-fluency/94/door.png" alt="door" title='Acessar' onClick={handleMenu} /> </Link>
            </div>
          )}

        </nav>
      )}
    </div>
  )
}

export default Navbar
