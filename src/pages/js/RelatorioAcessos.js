import React from 'react'
import RelAcesso from '../../components/js/RelAcesso'

const RelatorioAcessos = () => {
  return (
    <div>
      <h1><img width="70" height="70" src="https://img.icons8.com/3d-fluency/94/document.png" alt="document"/>Relatório de Acessos</h1>
      <i class="bi bi-clipboard-data"></i>
      <div className="container-md">
        <div className="styles acessos">
          <RelAcesso></RelAcesso>
        </div>

      </div>
    </div>
  )
}

export default RelatorioAcessos

