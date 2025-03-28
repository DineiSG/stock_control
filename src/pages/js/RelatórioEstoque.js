import React from 'react'
import RelEstoqueLoja from '../../components/relatorios/RelEstoqueLoja'
import RelBaixasMotivo from '../../components/relatorios/RelBaixasMotivo'
import RelBaixasPlaca from '../../components/relatorios/RelBaixasPlaca'
import RelBaixasLoja from '../../components/relatorios/RelBaixasLoja'
import RelAcesso from '../../components/relatorios/RelAcesso'
import SearchHistory from '../../components/buscas/SearchHistory'
import SearchInventario from '../../components/buscas/SearchInventario'
import RelBaixasData from '../../components/relatorios/RelBaixasData'
import SearchLiberacoes from '../../components/buscas/SearchLiberacoes'
import SearchLibMotivo from '../../components/buscas/SearchLibMotivo'
import SearchLibData from '../../components/buscas/SearchLibData'

const RelatorioEstoque = () => {
  return (
    <div>
      <h1><img width="70" height="70" src="https://img.icons8.com/3d-fluency/94/document.png" alt="document" /> Relatório de Estoque</h1>
      <div className="container-md">
        <div >
          <RelEstoqueLoja></RelEstoqueLoja>
        </div>

      </div>
      <h1><img width="70" height="70" src="https://img.icons8.com/3d-fluency/94/document.png" alt="document" /> Relatório de Baixas</h1>
      <div className="container-md">
        <RelBaixasPlaca></RelBaixasPlaca>
        <RelBaixasMotivo></RelBaixasMotivo>
        <RelBaixasLoja></RelBaixasLoja>
        <RelBaixasData></RelBaixasData>
      </div>
      <h1><img width="70" height="70" src="https://img.icons8.com/3d-fluency/94/document.png" alt="document" /> Relatório de Liberações</h1>
      <div className="container-md">
        <SearchLiberacoes></SearchLiberacoes>
        <SearchLibMotivo></SearchLibMotivo>
        <SearchLibData></SearchLibData>
      </div>
      <h1><img width="70" height="70" src="https://img.icons8.com/3d-fluency/94/document.png" alt="document" /> Relatório de Acessos</h1>
      <div className="container-md">
        <RelAcesso></RelAcesso>
      </div>
      <div>
        <h1><img width="70" height="70" src="https://img.icons8.com/3d-fluency/94/document.png" alt="search" /> Buscar Histórico do Veiculo</h1>
        <SearchHistory />
      </div>
      <div>
        <h1><img width="70" height="70" src="https://img.icons8.com/3d-fluency/94/document.png" alt="search" /> Relatorio de Inventário</h1>
        <SearchInventario></SearchInventario>
      </div>
    </div>
  )
}

export default RelatorioEstoque
