import React, { useState } from 'react'
import styles from './SearchForm.module.css'



const SearchLojas = () => {
    const [edit, setEdit]=useState(false)
    const [busca, setBusca]=useState(false)
    const [query, setQuery]= useState()
    const [results, setResults]=useState([])
    const [error, setError]= useState('')
    const [editableFields, setEditableFields]=useState({
        id: '',
        descricao: '',
        box: '',
        telefone: '',
        email: '',
        vagas: ''
    })

    /*Função que busca informações de uma loja pelo nome */
    const handleSearch = async (e)=>{
        e.preventDefault();
        if(!query) return;

        const upperCaseQuery = query.toUpperCase();
        try{
            const response= await fetch(`http://localhost:8090/api/lojas?descricao=${upperCaseQuery}`)
            const data = await response.json()
            const filteredResults = data.filter(loja => loja.descricao.toUpperCase()=== upperCaseQuery);

            if(filteredResults.length > 0 ){
                setResults(filteredResults)
                setError('')
                setEditableFields(filteredResults[0])
            }else{
                setResults([])
                setError(window.alert("Nao há nenhum veiculo com a placa informada."))
            }
        }catch(error){
            window.alert("Erro ao buscar dados: ", error)
        }
    }

    /*Função para editar os dados encontrados */
    const handleEditToggle=()=>{
        if(edit){
            handleSave()
        }
        setEdit(!edit)
    }

    /*Função que transforma os campos de uma tabela gerada apos a pesquisa em campos editaveis */
    const handleInputChange = (e)=>{
        const {name, value} = e.target
        setEditableFields({
            ...editableFields,
            [name]:value.toUpperCase()
        })
    }

    /*Função que salva os dados editados */
    const handleSave = async()=>{
        try {
            const response = await fetch(`http://localhost:8090/api/lojas/${editableFields.id}`,{
                method:'PUT',
                headers:{
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(editableFields)
            })
            if(response.ok){
                const updatedResult = await response.json()
                setResults(results.map(result=>(result.id === updatedResult.id? updatedResult : result)))
                window.alert("Dados atualizados com sucesso!") 
                
            }else{
                window.alert("Erro ao salvar os dados")
            }
            window.location.reload() 
        }catch (error){
            window.alert(`Erro ao enviar dados para o servidor`, error)
            window.location.reload()
        }
    }


    return (
        <div >
            <div className={styles.container}>
                <div class="container-lg">
                    <h2>Informe o nome da loja para buscar informações:</h2>
                    <form className={styles.pesquisa} onSubmit={handleSearch}>
                    <label>
                        <span>Nome:</span>
                       <input type='text' value={query} onChange={(e)=>setQuery(e.target.value)} required/> 
                    </label>
                    <button className={styles.buscar} type='submit'onClick={()=>setBusca(!busca)}>
                    {busca?'Buscar':'Buscar'}</button>
                    </form>
                </div>
                <div className={styles.table}>
                {busca?
               <table className="table table-primary table-striped-columns" border="1">
                  <thead>
                      <tr>
                          <th>Cod. Loja</th>
                          <th>Nome</th> 
                          <th>Box</th>
                          <th>Telefone</th>
                          <th>Email</th>
                          <th>Qtd Vagas</th>
                       </tr>
                  </thead>
                  <tbody>
                    {results.map((result) =>(
                      <tr key={result.id}>
                        <td>{result.id}</td>
						<td>{edit? <input className={styles.edit_data} type='text' name="descricao" value={editableFields.descricao} onChange={handleInputChange}/>: result.descricao}</td>
						<td>{edit? <input className={styles.edit_data} type='number' name="box" value={editableFields.box} onChange={handleInputChange}/>: result.box}</td>
                        <td>{edit? <input className={styles.edit_data} type='text' name="telefone" value={editableFields.telefone} onChange={handleInputChange}/>: result.telefone}</td>
                        <td>{edit? <input className={styles.edit_data} type='text' name="email" value={editableFields.email} onChange={handleInputChange}/>: result.email}</td>
                        <td>{edit? <input className={styles.edit_data} type='text' name="vagas" value={editableFields.vagas} onChange={handleInputChange}/>: result.vagas}</td>
                        
                      </tr>
                    ))}
                  </tbody>
                </table>: null}
                <button className={styles.edit}onClick={handleEditToggle}>
                {edit?'Salvar':'Editar'}</button>
                </div>
            </div>      
           
    </div>    
    )
}

export default SearchLojas
