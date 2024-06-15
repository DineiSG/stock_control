import {useState, useEffect } from "react"
import { sortAlphabetically } from "../Functions/sortAphabetically"                           
 

const LojaDestino = (urlB, urlC, sortKey) => {
    const[data, setData]=useState([])
    const [loading, setLoading]=useState(true)
    const [error, setError]=useState(null)
    
  
    useEffect(()=>{
      const fetchdata = async ()=>{
          setLoading(true)
          setError(null)
          try{
              const [responseB, responseC] = await Promise.all([fetch(urlB), fetch(urlC)])
              const [tableB, tableC] = await Promise.all([ responseB.json(), responseC.json()])


              const combinedDataBC = tableC.map(itemC =>{
                const itemB = tableB.find(itemB => itemB.id === itemC.id_veiculo_acessante)
                return{
                    ...itemC,
                    descricao: itemC ? [itemB.modelo, itemB.marca, itemB.placa, itemB.valor_meio_acesso] : 'Descricao nao encontrada'
                }
               
                })
            
            const sorteData = sortAlphabetically(combinedDataBC, sortKey)
            setData(sorteData)
  
              
          }catch(err){
           }finally{
          setLoading(false)
          }   
      }
      fetchdata()
    },[urlB,urlC, sortKey])
    
    return{data, loading, error}
    
  }

export default LojaDestino
