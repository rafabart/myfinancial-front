import React from 'react'
import currencyFormatter from 'currency-formatter'


export default props => {

    const rows = props.lancamentos.map(lancamento => {
        return (
            <tr key={lancamento.id}>
                <td>{lancamento.description}</td>
                <td>{currencyFormatter.format(lancamento.value, { code: 'BRL' })}</td>
                <td>{lancamento.typeExpense}</td>
                <td>{lancamento.month}</td>
                <td>{lancamento.statusExpense}</td>
                <td>
                    <button type="button" onClick={e => props.editarAction(lancamento.id)} className="btn btn-success mr-3">Editar</button>
                    <button type="button" onClick={e => props.deletarAction(lancamento)} className="btn btn-danger">Deletar</button>
                </td>
            </tr>
        )
    })


    return (
        <table className="table table-hover">
            <thead>
                <tr>
                    <th scope="col">Descrição</th>
                    <th scope="col">Valor</th>
                    <th scope="col">Tipo</th>
                    <th scope="col">Mês</th>
                    <th scope="col">Situação</th>
                    <th scope="col">Ações</th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    )
}