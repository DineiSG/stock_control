import React from 'react'
import SearchLojas from '../../components/js/SearchLojas'
import SearchVeiculos from '../../components/js/SearchVeiculos'
import SearchModelo from '../../components/js/SearchModelo'

const Buscas = () => {
  return (
    <div>
      <h1><img width="70" height="70" src="https://img.icons8.com/3d-fluency/94/search.png" alt="search"/>Pesquisar</h1>
      <SearchLojas></SearchLojas>
      <SearchVeiculos></SearchVeiculos>
      <SearchModelo></SearchModelo>
    </div>
  )
}

export default Buscas


