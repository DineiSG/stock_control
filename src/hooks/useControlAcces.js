import {useState, useEffect } from "react"

const useControlAcces = (url) => {
    const[data, setData]=useState([])
    const [loading, setLoading]=useState(true)
    const [error, setError]=useState(null)
    
  
    useEffect (() =>{  
      const fetchData = async () => {
          //6 - Loading
          //iniciando o loading
          setLoading(true)

          // 7 - Tratando erros
          try{
              const res = await fetch(url)

              const json = await res.json()

              setData(json)
          }catch (error){

              console.log(error.message)

              //Mensagem que sera exibida em caso de erro
              setError("Houve algum erro ao carregar os dados")

          }
          //finalizando o loading
          setLoading(false)
      }
      fetchData()
      //trazendo os dados atualizados
  },[url]) 

    return{data, loading, error}
}

export default useControlAcces
