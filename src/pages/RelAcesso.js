import FilterDate from '../components/FilterDate'


const RelAcesso = () => {
  return (
    <div>
      <h1>Relatório de Acessos</h1>
      <i class="bi bi-clipboard-data"></i>  
      <div className="container-md">
        <div className="styles acessos">
            <FilterDate></FilterDate> 
        </div>
      </div>
    </div>
  )
}

export default RelAcesso
