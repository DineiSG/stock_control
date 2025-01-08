import { useState } from 'react'
import styles from '../styles/Data.module.css'
import * as XLSX from 'xlsx'

const RenderTable = () => {

    const [dadosTabela, setDadosTabela] = useState([])
    const [dataInicio, setDataInicio] = useState('');
    const [dataFim, setDataFim] = useState('');



    const processarDadosTabela = (vendas) => {
        const lojaInstituicaoMap = {}

        vendas.forEach((venda) => {
            const { unidade, instituicao, valorFinanciamento } = venda

            const valor = parseFloat((valorFinanciamento || "0.0").replace(',', '.'))

            if (!lojaInstituicaoMap[unidade]) {
                lojaInstituicaoMap[unidade] = { Total: 0 }
            }

            if (!lojaInstituicaoMap[unidade][instituicao]) {
                lojaInstituicaoMap[unidade][instituicao] = 0
            }

            lojaInstituicaoMap[unidade][instituicao] += valor
            lojaInstituicaoMap[unidade].Total += valor
        })

        const tabela = Object.keys(lojaInstituicaoMap).map((loja) => {
            const instituicoes = Object.keys(lojaInstituicaoMap[loja]).filter(
                (key) => key !== 'Total'
            );
            const instituicaoComPorcentagem = instituicoes.reduce((acc, instituicao) => {
                const valor = lojaInstituicaoMap[loja][instituicao];
                const total = lojaInstituicaoMap[loja].Total;
                const porcentagem = ((valor / total) * 100).toFixed(2);
                acc[instituicao] = { valor, porcentagem };
                return acc;
            }, {});

            return {
                loja,
                ...instituicaoComPorcentagem,
                Total: lojaInstituicaoMap[loja].Total,
            };
        });

        return tabela;


    }

    const calcularTotaisGerais = (dadosTabela) => {
        if (!dadosTabela || dadosTabela.length === 0) {
            return { totaisComPorcentagem: {}, totalGeral: 0 }; // Retorna valores padrão se os dados estiverem vazios
        }
        const totaisPorInstituicao = {}
        let totalGeral = 0

        dadosTabela.forEach((linha) => {
            Object.keys(linha).forEach((coluna) => {
                if (coluna !== 'loja' && coluna !== 'Total') {
                    const valor = linha[coluna]?.valor || 0
                    totaisPorInstituicao[coluna] = (totaisPorInstituicao[coluna] || 0) + valor
                }
            })
            totalGeral += linha.Total || 0
        })
        const totaisComPorcentagem = Object.keys(totaisPorInstituicao).reduce((acc, coluna) => {
            const valor = totaisPorInstituicao[coluna]
            const porcentagem = ((valor / totalGeral) * 100).toFixed(2)
            acc[coluna] = { valor, porcentagem }
            return acc
        }, {})

        return { totaisComPorcentagem, totalGeral }
    }

    const fetchVendas = async () => {

        if (!dataInicio || !dataFim) {
            console.warn('Datas de inicio e fim nao definidos. ')
            return
        }

        const dataInicioFormatada = new Date(dataInicio).toISOString().split('T')[0]
        const dataFimFormatada = new Date(dataFim).toISOString().split('T')[0]

        try {
            const response = await fetch(`http://localhost:8090/api/v1/vendas`)

            if (!response.ok) {
                console.error('Erro na resposta do servidor: ', response.statusText)
                return
            }
            const data = await response.json()

            const filteredResults = data.filter((venda) => {
                const dataVenda = new Date(venda.dataRegistro).toISOString().split('T')[0]
                return dataVenda >= dataInicioFormatada && dataVenda <= dataFimFormatada
            })

            if (filteredResults.length > 0) {
                const tabelaProcessada = processarDadosTabela(filteredResults);
                console.log('Tabela processada: ', tabelaProcessada)
                setDadosTabela(tabelaProcessada)
            } else {
                window.alert('Nao há nenhuma venda no período selecionado. ')
                window.location.reload()
            }
        } catch (error) {
            console.error('Erro ao conectar ao servidor', error);
        }
    }

    const { totaisComPorcentagem, totalGeral } = calcularTotaisGerais(dadosTabela)

    const generateExcel = () => {
        // Preparar os dados formatados para exportação
        const formattedData = dadosTabela.map((linha) => {
            // Criar uma estrutura ordenada
            const formattedRow = {};

            // Adicionar a coluna "Loja" primeiro
            formattedRow["Loja"] = linha.loja;

            // Adicionar as colunas de instituições e porcentagens
            Object.keys(linha)
                .filter((coluna) => coluna !== "loja" && coluna !== "Total")
                .forEach((coluna) => {
                    formattedRow[`${coluna} (R$)`] = linha[coluna]?.valor?.toFixed(2) || "0.00";
                    formattedRow[`${coluna} (%)`] = linha[coluna]?.porcentagem || "0.00";
                });

            // Adicionar a coluna "Total" como última
            formattedRow["Total (R$)"] = linha.Total.toFixed(2);

            return formattedRow;
        });

        // Adicionar linha de totais gerais no final
        const totaisGeraisRow = { Loja: "TOTAL GERAL" };
        Object.keys(totaisComPorcentagem).forEach((coluna) => {
            totaisGeraisRow[`${coluna} (R$)`] = totaisComPorcentagem[coluna].valor.toFixed(2);
            totaisGeraisRow[`${coluna} (%)`] = totaisComPorcentagem[coluna].porcentagem;
        });
        totaisGeraisRow["Total (R$)"] = totalGeral.toFixed(2);

        formattedData.push(totaisGeraisRow);

        // Criar a planilha sem depender da ordem automática
        const worksheet = XLSX.utils.json_to_sheet(formattedData);

        // Reorganizar as colunas para garantir a ordem desejada
        const columnOrder = [
            "Loja",
            "Total (R$)",
            ...Object.keys(dadosTabela[0])
                .filter((coluna) => coluna !== "loja" && coluna !== "Total")
                .flatMap((coluna) => [`${coluna} (R$)`, `${coluna} (%)`]),

        ];

        // Reordenar o cabeçalho da planilha
        const worksheetOrdered = XLSX.utils.json_to_sheet(formattedData, { header: columnOrder });

        // Criar o arquivo Excel
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheetOrdered, "Relatório");

        // Exportar como arquivo Excel
        XLSX.writeFile(workbook, "Relatorio_Financeiro_Por_Instituicoes.xlsx");
    };



    return (
        <div>
            <div className={styles.render}>
                <div className={styles.containe_bar}>
                    <h2 className={styles.title}>RELATORIO DE VENDAS POR INSTITUIÇÂO</h2>
                    <p className={styles.p_txt}>Selecione o periodo para ver o relatorio de vendas:</p>
                    <div className={styles.dateImputs}>
                        <label>
                            Data Inicial:
                            <input className={styles.date} type='date' value={dataInicio} onChange={(e) => setDataInicio(e.target.value)} />
                        </label>
                        <label>
                            Data Final:
                            <input className={styles.date} type='date' value={dataFim} onChange={(e) => setDataFim(e.target.value)} />
                        </label>
                        <button className={styles.btn_buscar} onClick={fetchVendas}>
                            Buscar
                        </button>
                    </div>
                </div>
                <div className='table-responsive' >
                    {dadosTabela.length > 0 ? (
                        <table class="table table-secondary table-striped-columns" border="1">
                            <thead>
                                <tr>
                                    <th>Loja</th>
                                    {[...new Set(dadosTabela.flatMap((linha) => Object.keys(linha).filter(
                                        (coluna) => coluna !== 'loja' && coluna !== 'Total'
                                    ))),]
                                        .map((coluna) => (
                                            <>
                                                <th key={`${coluna}-valor`} style={{ color: 'blue' }}>{coluna} </th>
                                                <th key={`${coluna}-porcentagem`} style={{ color: 'red' }} >%{coluna}</th>
                                            </>
                                        ))}
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {dadosTabela.map((linha, index) => (
                                    <tr key={index}>
                                        <td>{linha.loja}</td>
                                        {[...new Set(dadosTabela.flatMap((linha) => Object.keys(linha).filter(
                                            (coluna) => coluna !== 'loja' && coluna !== 'Total')))]
                                            .map((coluna) => (
                                                <>
                                                    <td key={`${coluna}- valor - ${index}`} style={{ color: 'blue' }}>
                                                        R$ {''} {linha[coluna]?.valor !== undefined ? linha[coluna].valor.toFixed(2) : '0.00'}
                                                    </td>
                                                    <td td key={`${coluna}- porcentagem - ${index}`} style={{ color: 'red' }}>
                                                        {linha[coluna]?.porcentagem !== undefined ? `${linha[coluna].porcentagem}%` : '0%'}
                                                    </td>
                                                </>
                                            ))}
                                        <td>R$ {linha.Total.toFixed(2)}</td>
                                    </tr>
                                ))}
                                {/*Linha de totais gerais */}
                                <tr>
                                    <td style={{ fontWeight: '700' }}>TOTAL GERAL</td>
                                    {Object.keys(totaisComPorcentagem).map((coluna) => (
                                        <>
                                            <td key={`${coluna}=total`} style={{ color: 'blue' }}>R$ {totaisComPorcentagem[coluna].valor.toFixed(2)}</td>
                                            <td key={`${coluna}-porcentagem`} style={{ color: 'red' }}>{totaisComPorcentagem[coluna].porcentagem}%</td>
                                        </>
                                    ))}
                                    <td>R$ {totalGeral.toFixed(2)}</td>
                                </tr>
                            </tbody>
                        </table>
                    ) : (
                        null
                    )}

                </div>
                <div className={styles.gerar_planilha}>
                    <button className={styles.btn_buscar} onClick={generateExcel} > Relatório </button>
                </div>

            </div>

        </div>
    )
}

export default RenderTable
