import styles from '../styles/Navbar.module.css'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import LoginModal from '../js/LoginModal'



const Navbar = () => {
  const location = useLocation()
  const isHome = location.pathname === '/home'

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

  const handleAccess = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "login": "admin",
      "password": "admin"
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("http://192.168.1.100/login.fcgi", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }





  async function handleIn() {

    try {
      const returnResult = handleAccess()

      if (!returnResult) {
        console.error('Falha ao obter resultado de hndleAccess')
        return
      }

      const response = await fetch(`http://localhost:8090/api/acessos/entrada?${returnResult}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          actions: [
            {
              "action": "sec_box",
              "parameters": "id=65793, reason=3"
            }
          ]
        })
      });
      if (response.ok) {
        try {
          const data = await response.json(); // Tenta converter a resposta para JSON
          console.log("Cancela levantada.", data);

        } catch {
          console.log("Resposta recebida, mas não é JSON ou está vazia.");
        }

      } else {
        console.error("Erro ao levantar a cancela")
      }
    } catch {
      console.log("Resposta recebida, mas não é JSON ou está vazia.");
    }

  }

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <img src='/logo2.png' className={styles.logo} alt='Stock Control' title='Stock Control' />
      </div>
      {isMenuVisible && (
        <div className={styles.menu}>
                    <div className={styles.navItem}>
            <button className={styles.nav} id="dropdown5" >Lojista</button>
            <ul className={styles.dropdownMenu}>
              <li><Link to='com_vendas' className={styles.dropdown}>Comunicação de Venda</Link></li>
            </ul>
          </div>
          <div className={styles.navItem}>
            <button className={styles.nav} id="dropdown1">Cadastros</button>
            <ul className={styles.dropdownMenu}>
              <li><Link to='cad_loja' className={styles.dropdown}>Cadastrar Loja</Link></li>
              <li><Link to='cad_veic' className={styles.dropdown}>Cadastrar Veiculo</Link></li>
            </ul>
          </div>
          <div className={styles.navItem}>
            <button className={styles.nav} id="dropdown2">Gestao de Estoque</button>
            <ul className={styles.dropdownMenu} >
              <li><Link to='/relatorio_estoque' className={styles.dropdown}>Relatorio de Estoque <br />e  Baixas</Link></li>
              <li><Link to='/inventario' className={styles.dropdown}>Inventário</Link> </li>
            </ul>
          </div>
          <div className={styles.navItem}>
            <button className={styles.nav} id="dropdown3">Movimentações</button>
            <ul className={styles.dropdownMenu}>
              <li><button onClick={() => handleOpenModal('/liberacoes')} className={styles.dropdown}>Liberar Veículo</button></li>
              <li><button onClick={() => handleOpenModal('/baixar_veic')} className={styles.dropdown}>Baixar Veículo</button></li>
            </ul>
            {isModalOpen && (
              <LoginModal onClose={handleCloseModal} onLogin={handleLoginSuccess} />
            )}
          </div>
          <div className={styles.navItem}>
            <button className={styles.nav} id="dropdown4" onMouseEnter={() => handleAccess()}>Acesso</button>
            <ul className={styles.dropdownMenu}>
              <li className={styles.dropdown} onClick={() => handleIn()}>Entrada</li>
              <li className={styles.dropdown}>Saida</li>
              <li><Link to='/relatorio_acesso' className={styles.dropdown}>Rel. de Acessos</Link></li>
            </ul>
          </div>
          <Link to='/buscas' className={styles.pesquisar} i>Pesquisar</Link>
          <div className={styles.links} alt='Home' title='Ir para home'>
            <Link to='/dashboard'><img width="50" height="50" src="https://img.icons8.com/3d-fluency/94/home.png" alt="home" /></Link>
          </div>
          {isHome && (
            <Link to='/dashboard'><button className={styles.login} ><svg xmlns="http://www.w3.org/2000/svg" width="50" height="30" fill="currentColor" class="bi bi-box-arrow-in-right" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0z" />
              <path fill-rule="evenodd" d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z" />
            </svg>Sair</button></Link>
          )}
        </div>
      )}
      {iconVisible && (
        <Link to='/dashboard'>
          <img width="50" height="50" src="https://img.icons8.com/3d-fluency/94/door.png" alt="door" title='Acessar' onClick={handleMenu} />
        </Link>
      )}
    </nav>
  )
}

export default Navbar
