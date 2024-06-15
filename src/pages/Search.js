import React from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import useFetch from '../hooks/useFetch'


const Search = () => {
    const [searchParams]=useSearchParams()

    const urlLojas="http://localhost:8090/api/lojas/descricao?" +searchParams
    const urlVeiculos="http://localhost:8090/api/lojas/placas?" +searchParams

    const {data: items }=useFetch(urlLojas)
    const {data: itemsV }=useFetch(urlVeiculos)

  return (

    <div>
      <h2>Resultados disponiveis para sua busca por Loja:</h2>
      <ul className='products'>
        {/*Listando os itens do BD*/}
        {items && items.map((item)=>(
        <li key={item.id}>
            <p>Codigo: {item.id}</p>
            <p>Loja {item.descricao}</p>
            <p>Qtd Vagas: {item.vagas}</p>
            <p>Telefone: {item.telefone}</p>
            <p>E-mail: {item.email}</p>
            <p>Box: {item.box}</p>
        </li>))}
        
      </ul>
      <h2>Resultados disponiveis para sua busca pelo Veiculo:</h2>
      <ul className='products'>
        {/*Listando os itens do BD*/}
        {itemsV && itemsV.map((itemV)=>(
        <li key={itemV.id}>
            <p>Codigo: {itemV.id}</p>
            <p>Loja {itemV.descricao}</p>
            <p>Placa: {itemV.vagas}</p>
            <p>Marca: {itemV.marca}</p>
            <p>Modelo: {itemV.modelo}</p>
            <p>Cor: {itemV.cor}</p>
            <p>Nª Tag: {itemV.valor_meio_acesso}</p>
            <p>Loja: {itemV.unidade}</p>
        </li>))}
      </ul>
    </div>
  )
}

export default Search
