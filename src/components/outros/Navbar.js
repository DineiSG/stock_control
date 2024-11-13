import styles from '../styles/Navbar.module.css'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import LoginModal from '../outros/LoginModal'
import AlertLibModal from './AlertLibModal'



const Navbar = () => {
  const location = useLocation()
  const isHome = location.pathname === '/home'
  const [alertModalOpen, setAletModalOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [redirectPath, setRedirectPath] = useState('')
  const navigate = useNavigate()
  const [isMenuVisible, setIsMenuVisible] = useState(false)
  const [iconVisible, setIconVisible] = useState(false)



  //Função que altera a visibilidade do menu
  const handleMenu = () => {
    setIsMenuVisible(!isMenuVisible)
  }

  //Esconde o ícone quando a URL muda
  useEffect(() => {
    if (location.pathname !== '/') {
      setIconVisible(false)// Oculta o ícone quando sair da página "acesso"
      setIsMenuVisible(true);// Garante que o menu permaneça visível após a navegação
    } else {
      setIconVisible(true)// Exibe o ícone quando estiver na página "acesso"
      setIsMenuVisible(false);// Esconde o menu inicialmente
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
    navigate(redirectPath); // Redireciona para a página desejada após o login
  };


  return (
    
    <nav className={styles.navbar} id="navbar">
      <div className={styles.logo}>
        <img src='/logo2.png' className={styles.logo} alt='Stock Control' title='Stock Control' />
      </div>
      {isMenuVisible && (
        <div className={styles.menu}>
          <div className={styles.navItem}>
            <button className={styles.nav} id="dropdown5" >Lojista</button>
            <ul className={styles.dropdownMenu}>
              <li><Link to='com_vendas' className={styles.dropdown}>Comunicação de Venda</Link></li>
              <li><button onClick={()=>handleModalAlertOpen ('/solic_lib_venda')} className={styles.dropdown}> Solicitar Liberação</button></li>
              <li><Link to='cad_vendedor' className={styles.dropdown}>Cadastro de Vendedor</Link></li>
              <li><Link to='cons_venda' className={styles.dropdown}>Consultar Venda</Link></li>
            </ul>
            {alertModalOpen && <AlertLibModal onClose={handleModalAlertClose} />}
          </div>
        
          <div className={styles.navItem}>
            <button className={styles.nav} id="dropdown2">Gestao de Estoque</button>
            <ul className={styles.dropdownMenu} >
              <li><Link to='cad_veic' className={styles.dropdown}>Cad. Veiculo BIN</Link></li>
              <li><Link to='cadastro_manual' className={styles.dropdown}>Cad. Veiculo S/ BIN</Link></li>
              <li><Link to='cad_loja' className={styles.dropdown}>Cad. Loja</Link></li>
              <li><Link to='/inventario' className={styles.dropdown}>Inventário</Link> </li>
            </ul>
          </div>
          <div className={styles.navItem}>
            <button className={styles.nav} id="dropdown3">Administração</button>
            <ul className={styles.dropdownMenu}>
              <li><button onClick={() => handleOpenModal('/liberacoes')} className={styles.dropdown}>Liberar Veículo</button></li>
              <li><button onClick={() => handleOpenModal('/baixar_veic')} className={styles.dropdown}>Baixar Veículo</button></li>
              <li><Link to='relatorio_estoque' className={styles.dropdown}>Relatórios</Link></li>
              <li><Link to='dashboard' className={styles.dropdown}>Dashboard</Link></li>

            </ul>
            {isModalOpen && (
              <LoginModal onClose={handleCloseModal} onLogin={handleLoginSuccess} />
            )}
          </div>
          
          <Link to='/buscas' className={styles.pesquisar} i>Pesquisar</Link>
          <div className={styles.links} alt='Home' title='Ir para home'>
            <Link to='/home'><img width="50" height="50" src="https://img.icons8.com/3d-fluency/94/home.png" alt="home" /></Link>
          </div>
         {/*} {isHome && (
            <Link to='/'><button className={styles.login} ><svg xmlns="http://www.w3.org/2000/svg" width="50" height="30" fill="currentColor" class="bi bi-box-arrow-in-right" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0z" />
              <path fill-rule="evenodd" d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z" />
            </svg>Sair</button></Link>
          )}*/}
        </div>
      )}
      {iconVisible && (
        <Link to='/home'>
          <img width="50" height="50" src="https://img.icons8.com/3d-fluency/94/door.png" alt="door" title='Acessar' onClick={handleMenu} />
        </Link>
      )}
    </nav>
  )
}

export default Navbar
