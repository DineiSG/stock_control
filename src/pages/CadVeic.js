import React, { useState } from 'react'
import styles from './CadVeic.module.css'


const url='http://localhost:8090/api/veiculos'

const CadVeic = () => {
    const [unidade, setUnidade]=useState('')
    const [id_unidade, setIdUnidade]=useState('')
    const [marca, setMarca]=useState('')
    const [modelo, setModelo]=useState('')
    const [cor, setCor]=useState('')
    const [placa, setPlaca]=useState('')
    const [ano, setAno]=useState('')
    const [valor_meio_acesso, setValorMeioAcesso]=useState('')
    const [veiculo_status, setVeiculoStatus]= useState('')
    const [renavan, setRenavan]=useState('')
    const [loading, setLoading]=useState()
    


    const handleSubmit = async (e)=>{

        /*Função que trata da inserção de data de forma automática */
        const formatTimestamp = (date) => {
            const pad = (num, size) => ('000' + num).slice(size * -1);
            const offset = -date.getTimezoneOffset();
            const sign = offset >= 0 ? '+' : '-';
            const offsetHours = pad(Math.floor(Math.abs(offset) / 60), 2);
            const offsetMinutes = pad(Math.abs(offset) % 60, 2);
            const dateString = date.getFullYear() + '-' +
                               pad(date.getMonth() + 1, 2) + '-' +
                               pad(date.getDate(), 2) + 'T' +
                               pad(date.getHours(), 2) + ':' +
                               pad(date.getMinutes(), 2) + ':' +
                               pad(date.getSeconds(), 2) + '.' +
                               pad(date.getMilliseconds(), 5) +
                               sign + offsetHours + ':' +  offsetMinutes
            return dateString;
        };
        const data_registro = formatTimestamp(new Date());

        e.preventDefault()
        const payload ={
            unidade,id_unidade, marca, modelo,ano, cor, placa, valor_meio_acesso, veiculo_status, renavan, data_registro
        }

        const toUpperCasePayload=(data)=>{
            const upperCaseData = {};
            for (const key in data){
                if (typeof data[key] === 'string'){
                    upperCaseData[key] = data[key].toUpperCase()
                }else{
                    upperCaseData[key]=data[key]
                }
            }
            return upperCaseData
            
        }

        const upperCasePayload = toUpperCasePayload(payload)
        console.log('Payload enviado: ', upperCasePayload)
        
        console.log('Payload enviado: ', payload)

        try{
        const response = await fetch(url, {
            method: 'POST', 
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(upperCasePayload),
        })
            if (response.ok){
                console.log('Cadastro realizado com sucesso!')
                window.alert('Veiculo cadastrado com sucesso!');
                window.location.reload();
            }else{
                console.log('Erro ao enviar os dados')
                window.alert('Erro ao realizar o cadastro. Tente novamente.');
            }
        } catch (error) {
            window.alert('Erro ao realizar o cadastro. Tente novamente.');
        } finally {
            
        }
    }
    
   

    return (
        <div >
           
            <h1>Cadastro de Veículos<svg xmlns="http://www.w3.org/2000/svg" width="110" height="50" fill="rgba(89, 3, 110, 0.871)" class="bi bi-pencil-square" viewBox="0 0 16 16">
              <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
              <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
              </svg></h1>
            <div className={styles.container}>
                <div class="container-lg">
                    <h2>Informe os dados do veículo:</h2>
                    <div className={styles.formulario}>
                        <form className={styles.cadastro}  onSubmit={handleSubmit}>
                            
                            <label>
                                <span>Loja:</span>
                                <input type='text' name='loja' value={unidade} onChange={(e)=>setUnidade(e.target.value)} required ></input>
                            </label>
                            <label>
                                <span>Cod Loja::</span>
                                <input className={styles.tag} type='number' name='Cod' value={id_unidade} onChange={(e)=>setIdUnidade(e.target.value)} required></input>
                            </label>
                            <label>
                                <span>Marca:</span>
                                <input type='text' name='marca' value={marca} onChange={(e)=>setMarca(e.target.value)} required></input>
                            </label>
                            <label>
                                <span>Modelo:</span>
                                <input type='text' name='modelo' value={modelo} onChange={(e)=>setModelo(e.target.value)} required></input>
                            </label>
                            <label>
                                <span>Cor:</span>
                                <input className={styles.cor} type='text' name='cor' value={cor} onChange={(e)=>setCor(e.target.value)} required></input>
                            </label>
                            <label>
                                <span>Ano:</span>
                                <input className={styles.ano}type='text' name='ano' value={ano} onChange={(e)=>setAno(e.target.value)} required></input>
                            </label>
                            <label>
                                <span>Placa:</span>
                                <input className={styles.placa}type='text' name='placa' value={placa} onChange={(e)=>setPlaca(e.target.value)} required></input>
                            </label>
                            <label>
                                <span>Tag:</span>
                                <input className={styles.tag}type='text' name='tag' maxLength={6} value={valor_meio_acesso} onChange={(e)=>setValorMeioAcesso(e.target.value)} required></input>
                            </label>
                            <label>
                                <span>Renavan:</span>
                                <input type='text' name='modelo' value={renavan} onChange={(e)=>setRenavan(e.target.value)} required></input>
                            </label>
                            <label>
                                <span>Status (D: Dentro/ F:Fora):</span>
                                <input className={styles.status} type='text' name='status' value={veiculo_status} onChange={(e)=>setVeiculoStatus(e.target.value)} required maxLength={1}></input>
                            </label>
                            <button className={styles.cadastrar} onClick={()=>setLoading} disabled={loading}>{loading ? 'Cadastrando...' : 'Cadastrar'}</button>
                        </form>
                    </div>
                </div>
            </div>
          
        </div>
    )
}

export default CadVeic
