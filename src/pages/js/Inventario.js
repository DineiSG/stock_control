import React from 'react'
import GerarInventario from '../../components/js/GerarInventario'
import LancarInventario from '../../components/js/LancarInventario'



const Inventario = () => {
  return (
    <div>
      <h1><img width="70" height="90" src="https://img.icons8.com/3d-fluency/94/counter.png" alt="counter"/> Inventário</h1>
      <GerarInventario></GerarInventario>
      <LancarInventario></LancarInventario>
      
    </div>
  )
}

export default Inventario
