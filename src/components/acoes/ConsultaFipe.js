import React from 'react'
import React, { useState, useEffect } from 'react'

const ConsultaFipe = () => {
    const [marcas, setMarcas]=useState('')

    useEffect(() => {
        const fetchLojas = async () => {
            try {
                const response = await fetch(`https://parallelum.com.br/fipe/api/v1/carros/marcas`)
                const data = await response.json()
                //console.log('Dados da API: ', data)
                if (Array.isArray(data)) {
                    setMarcas(data)
                } else {
                    console.error('A resposta da API nao e um array', data)
                }
            } catch (error) {
                console.error('Erro ao buscar lojas: ', error)
            }
        }
        fetchLojas()
    }, [])


  return (
    <div>
      <div class="container-lg">
      <form className={styles.pesquisa} onSubmit={handleSearch}>
              <label>
                <p>Selecione uma loja:</p>
                <select value={query} onChange={(e) => setQuery(e.target.value)} required>
                  <option value=""></option>
                  <option value='ESTOQUE GERAL'>ESTOQUE GERAL</option>
                  {marcas.map((marca) => (
                    <option key={marca.codigo} value={marca.nome}>
                      {marca.nome}
                    </option>
                  ))}
                </select>
              </label>
            </form>
      </div>
    </div>
  )
}

export default ConsultaFipe
