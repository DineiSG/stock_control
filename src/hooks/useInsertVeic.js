import {useState} from 'react'

const useInsertVeic = () => {
    const [loading, setLoading]= useState(false)
    const [error, setError]=useState(null)
    const [dataInsert, setDataInsert]=useState(null)

    const useInsertVeic= async(loja, marca, modelo, cor, ano, placa, tag)=>{
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
                setDataInsert(result)
            }catch(err){
            setError(err.message)
            }finally{
            setLoading(false)
        }
        
    }
    return {useInsertVeic, loading, error, dataInsert}
}


export default useInsertVeic
