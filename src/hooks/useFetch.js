import { useState, useEffect } from 'react'



export const useFetch = () => {
    const urlLojas = "http://localhost:8090/api/lojas"
    const urlVeiculos="http://localhost:8090/api/veiculos"

  
    const [data, setData]=useState(null)

    useEffect(()=>{
        const fetchData = async()=>{
            const res = await fetch(urlVeiculos)
            const json = await res.json()
            setData(json)
        }
        fetchData()
    },[urlVeiculos])

    useEffect(()=>{
        const fetchData = async()=>{
            const res = await fetch(urlLojas)
            const json = await res.json()
            setData(json)
        }
        fetchData()
    },[urlLojas])


    return{data}
  
}

