import { useState } from 'react'

const useInsertDataLoja = (url) => {
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
        if(response.ok){
            window.alert("Cadastro realizado com sucesso.")
        }else{
            window.alert("Falha ao realizar o cadastro.")
            throw new Error('Erro ao enviar dados para o servidor')
        }
         window.location.reload();//Função responsavel por recarregar a pagina apos o envio de dados
        
       
    }catch(err){
        setError(err.message)
    }finally{
        setLoading(true)
    }
  }
  return {cadastro, loading, error}
}

export default useInsertDataLoja
