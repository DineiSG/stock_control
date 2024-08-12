import styles from './Navbar.module.css'
import { Link, useLocation, useNavigate } from 'react-router-dom'


const Navbar = () => {
  const location = useLocation()
  const isHome = location.pathname === '/home'


  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <img src='/logo2.png' className={styles.logo} alt='Stock Control' title='Stock Control' />
      </div>
      <div className={styles.menu}>
      <div className={styles.navItem}>
        <button className={styles.nav} id="dropdown1">Cadastros</button>
        <ul className={styles.dropdownMenu}>
          <li><Link to='cad_loja' className={styles.dropdown}>Cadastrar Loja</Link></li>
          <li><Link to='cad_veic' className={styles.dropdown}>Cadastrar Veiculo</Link></li>
        </ul>
      </div>
      <div className={styles.navItem}>
        <button className={styles.nav} id="dropdown2">Relatórios</button>
        <ul className={styles.dropdownMenu}>
          <li><Link to='/relatorio_estoque' className={styles.dropdown}>Estoque e Baixas</Link></li>
          <li><Link to='/relatorio_acesso' className={styles.dropdown}>Rel. de Acessos</Link></li>
        </ul>
      </div>
      <div className={styles.navItem}>
        <button className={styles.nav} id="dropdown3">Movimentações</button>
        <ul className={styles.dropdownMenu}>
        <li><Link to='/liberacoes' className={styles.dropdown}>Liberar Veiculo</Link></li>
        <li><Link to='/baixar_veic' className={styles.dropdown}>Baixar Veiculo</Link></li>
        </ul>
      </div>
      <div className={styles.navItem}>
        <button className={styles.nav} id="dropdown4">Acesso</button>
        <ul className={styles.dropdownMenu}>
          <li><Link to='/' className={styles.dropdown}>Entrada</Link></li>
          <li><Link to='/' className={styles.dropdown}>Saida</Link></li>
        </ul>
      </div>
          <Link to='/buscas'className={styles.pesquisar} i>Pesquisar</Link>
          
        <div className={styles.links} alt='Home' title='Ir para home'>
          <Link to='/'><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-house" viewBox="0 0 16 16" >
            <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z" />
          </svg></Link>
          {/*<Link to='/cad_user'><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-person-plus-fill" viewBox="0 0 16 16">
                    <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
                    <path fill-rule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5"/>
                    </svg></Link>*/}
        </div>
        {isHome && (
          <Link to='/'><button className={styles.login} ><svg xmlns="http://www.w3.org/2000/svg" width="50" height="30" fill="currentColor" class="bi bi-box-arrow-in-right" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0z" />
            <path fill-rule="evenodd" d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z" />
          </svg>Sair</button></Link>
        )}
      </div>
    </nav>
  )
}

export default Navbar
