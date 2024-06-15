import { useState } from 'react'

const useInsertDataVeic = (url) => {
    const [loading, setLoading] = useState(false)
    const [error, setError]=useState(null)
  
    const cadastro = async (data)=>{
      setLoading(true)
      setError(null)
  
      try{
          const response= await fetch(url, {
              method:'POST',
              headers:{
                  'Content-Type':'application/json'
              },
              body:JSON.stringify(data),
  
          })
          if(!response.ok){
              throw new Error('Erro ao enviar dados para o servidor')
          }
  
          window.location.reload(); //Função responsavel por recarregar a pagina apos o envio de dados
      }catch(err){
          setError(err.message)
      }finally{
          setLoading(false)
      }
    }
    return {cadastro, loading, error}
  
}

export default useInsertDataVeic
