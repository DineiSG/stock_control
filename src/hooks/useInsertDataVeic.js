import {useState} from 'react'

const useInsertDataVeic = () => {
    const [loading, setLoading]= useState(false)
    const [error, setError]=useState(null)
    const [data, setData]=useState(null)

    const useInsertDataVeic= async(loja, marca, modelo, cor, ano, placa, tag)=>{
        setLoading(true);
        setError(null)
        try{
            const response = await fetch('http://localhost:8090/api/veiculos', {
                method: 'Post',
                headers: {
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({loja, marca, modelo, cor, ano, placa, tag}),
                })
                const result = await response.json();
                if(!response.ok){
                    throw new Error(result.error || 'Ocorreu algum erro' )
                }
                setData(result)
            }catch(err){
            setError(err.message)
            }finally{
            setLoading(false)
        }
        
    }
    return {useInsertDataVeic, loading, error, data}
}


export default useInsertDataVeic
