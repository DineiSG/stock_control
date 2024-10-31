//Hook para buscar dados no banco
import { useState, useEffect } from "react";



const useFetch=(url)=>{
    const [data, setData] = useState(null)
    const [loading, setLoading]= useState(null)
    const [error, setError]=useState(null)

    useEffect(()=>{

        const fetchData=async () =>{
            try{
                const response=await fetch(url)
                if (!response.ok){
                    throw new Error('Resposta inesperada do servidor')
                }
                const data = await response.json()
                setData(data)
            }catch(error){
                setError(error)
            }finally{
                setLoading(false)
            
            }
        }
        fetchData()
    }, [url])
    return {data, loading, error}
}

export default useFetch