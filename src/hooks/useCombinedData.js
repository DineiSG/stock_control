import {useState, useEffect } from "react"
import { sortAlphabetically } from "../Functions/sortAphabetically"


/*Este hook é responsaável por buscar os dados das tabelas vaga.veiculo e unidade.unidade. Ele compara os campos fk id_unidade da tabela 
vaga.veiculo e id_unidade da tabela unidade.unidade. Caso sejam iguais, ele retorna o nome da loja no front end, juntamente com
os veículos que estao alocados nela cujo id corresponda à busca. */

const useCombinedData = (urlA, urlB, sortKey) => {
  const[data, setData]=useState([])
  const [loading, setLoading]=useState(true)
  const [error, setError]=useState(null)
  

  useEffect(()=>{
    const fetchdata = async ()=>{
        setLoading(true)
        setError(null)
        try{
            const [responseA, responseB] = await Promise.all([fetch(urlA), fetch(urlB)])
            const [tableA, tableB] = await Promise.all([responseA.json(), responseB.json()])

            const combinedData = tableB.map(itemB =>{
                const itemA = tableA.find(itemA => itemA.id === itemB.id_unidade)
                return{
                    ...itemB,
                    descricao: itemB ? itemA.descricao : 'Descricao nao encontrada'
                }
            })
            const sortedData = sortAlphabetically(combinedData, sortKey)
            setData(sortedData)
            setData(combinedData)

            
        }catch(err){
         }finally{
        setLoading(false)
        }   
    }
    fetchdata()
  },[urlA,urlB, sortKey])
  return{data, loading, error}
  
}


export default useCombinedData
