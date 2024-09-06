import React from 'react'
import RelEstoqueLoja from '../../components/js/RelEstoqueLoja'
import RelBaixasMotivo from '../../components/js/RelBaixasMotivo'
import RelBaixasPlaca from '../../components/js/RelBaixasPlaca'
import RelBaixasLoja from '../../components/js/RelBaixasLoja'

const RelatorioEstoque = () => {
  return (
    <div>
      <h1><img width="70" height="70" src="https://img.icons8.com/3d-fluency/94/document.png" alt="document"/> Relatório de Estoque</h1>
      <div className="container-md">
        <div >
          <RelEstoqueLoja></RelEstoqueLoja>
        </div>


      </div>
      <h1><img width="70" height="70" src="https://img.icons8.com/3d-fluency/94/document.png" alt="document"/> Relatório de Baixas</h1>
      <div className="container-md">
        <RelBaixasMotivo></RelBaixasMotivo>
        <RelBaixasPlaca></RelBaixasPlaca>
        <RelBaixasLoja></RelBaixasLoja>
      </div>

    </div>
  )
}

export default RelatorioEstoque
