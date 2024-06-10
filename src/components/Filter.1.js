import React from 'react';
import { useState, useEffect } from 'react';
import styles from './Filter.module.css';
import { urlLojas } from './Filter';

export const Filter = () => {
    const [filtroLoja, setFiltroLoja] = useState(false);
    const [filtroMarca, setFiltroMarca] = useState(false);
    const [filtroModelo, setFiltroModelo] = useState(false);

    const [veiculos, setVeiculos] = useState([]);
    const [lojas, setLojas] = useState([]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(async () => {

        const res = await fetch(urlLojas);

        const data = await res.json();

        setLojas(data);



    }, []);


    return (
        <div>
            <div className={styles.container}>
                <h2>Selecione um filtro:</h2>
                <div className={styles.select}>
                    <button className={styles.filtrar} onClick={() => setFiltroLoja(!filtroLoja)}><svg xmlns="http://www.w3.org/2000/svg" width="35" height="25" fill="currentColor" class="bi bi-funnel" viewBox="0 0 16 16">
                        <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5zm1 .5v1.308l4.372 4.858A.5.5 0 0 1 7 8.5v5.306l2-.666V8.5a.5.5 0 0 1 .128-.334L13.5 3.308V2z" />
                    </svg>
                        {filtroLoja ? 'Por Loja' : 'Por Loja'}</button>
                    {filtroLoja ?
                        <table className="table table-success">
                            <thead>
                                <tr>
                                    <th>Loja</th>
                                    <th>Marca</th>
                                    <th>Modelo</th>
                                    <th>Ano</th>
                                    <th>Cor</th>
                                    <th>Nº Tag</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{lojas.loja}</td>
                                    <td>{veiculos.marca}</td>
                                    <td>{veiculos.modelo}</td>
                                    <td>{veiculos.ano}</td>
                                    <td>{veiculos.cor}</td>
                                    <td>{veiculos.tag}</td>
                                </tr>
                            </tbody>
                        </table> : null}
                    <button className={styles.filtrar} onClick={() => setFiltroMarca(!filtroMarca)}><svg xmlns="http://www.w3.org/2000/svg" width="35" height="25" fill="currentColor" class="bi bi-funnel" viewBox="0 0 16 16">
                        <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5zm1 .5v1.308l4.372 4.858A.5.5 0 0 1 7 8.5v5.306l2-.666V8.5a.5.5 0 0 1 .128-.334L13.5 3.308V2z" />
                    </svg>
                        {filtroMarca ? 'Por Marca' : 'Por Marca'}</button>
                    {filtroMarca ?
                        <table className="table table-success">
                            <thead>
                                <tr>
                                    <th>Marca</th>
                                    <th>Modelo</th>
                                    <th>Ano</th>
                                    <th>Cor</th>
                                    <th>Loja</th>
                                    <th>Nº Tag</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </table> : null}
                    <button className={styles.filtrar} onClick={() => setFiltroModelo(!filtroModelo)}><svg xmlns="http://www.w3.org/2000/svg" width="35" height="25" fill="currentColor" class="bi bi-funnel" viewBox="0 0 16 16">
                        <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5zm1 .5v1.308l4.372 4.858A.5.5 0 0 1 7 8.5v5.306l2-.666V8.5a.5.5 0 0 1 .128-.334L13.5 3.308V2z" />
                    </svg>
                        {filtroModelo ? 'Por Modelo' : 'Por Modelo'}</button>
                    {filtroModelo ?
                        <table className="table table-success">
                            <thead>
                                <tr>
                                    <th>Modelo</th>
                                    <th>Marca</th>
                                    <th>Ano</th>
                                    <th>Cor</th>
                                    <th>Loja</th>
                                    <th>Nº Tag</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </table> : null}
                </div>
            </div>
        </div>
    );
};
