import React from 'react'
import { withRouter } from 'react-router-dom'
import Card from '../../components/card'
import FormGroup from '../../components/form-group'
import SelectMenu from '../../components/selectMenu'
import ExpensesTable from 'expensesTable'

class ConsultaLancamentos extends React.Component {

    render() {

        const meses = [
            { label: 'Selecione...', value: '' },
            { label: 'Janeiro', value: '1' },
            { label: 'Fevereiro', value: '2' },
            { label: 'Março', value: '3' },
            { label: 'Abril', value: '4' },
            { label: 'Maio', value: '5' },
            { label: 'Junho', value: '6' },
            { label: 'Julho', value: '7' },
            { label: 'Agosto', value: '8' },
            { label: 'Setembro', value: '9' },
            { label: 'Novembro', value: '10' },
            { label: 'Dezembro', value: '11' }
        ]


        const tipos = [
            { label: 'Selecione...', value: '' },
            { label: 'Despesa', value: 'DESPESA' },
            { label: 'Receita', value: 'RECEITA' }
        ]


        const lacamentos = [
            { id: 1 },
            { description: 'Salario' },
            { value: 50000 },
            { month: 11 },
            { typeExpense: 'Receita' },
            { statusExpense: 'Efetivado' }
        ]


        return (

            <Card title="Consulta Lançamentos">

                <div className="row">
                    <div className="col-lg-6">
                        <div className="bs-component">

                            <FormGroup htmlFor="inputAno" label="Ano: *">
                                <input id="inputAno" type="text"
                                    name="ano"
                                    className="form-control"
                                    placeholder="Digite o Ano" />

                            </FormGroup>

                            <FormGroup htmlFor="inputMes" label="Mês: *">
                                <SelectMenu className="form-control" lista={meses} />
                            </FormGroup>

                            <FormGroup htmlFor="inputTipo" label="Tipo de Lançamento: *">
                                <SelectMenu className="form-control" lista={tipos} />
                            </FormGroup>

                            <button onClick={this.save} className="btn btn-success mr-3">Salvar</button>
                            <button onClick={this.cancel} className="btn btn-danger">Cancelar</button>

                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-6">
                        <div className="bs-component"></div>
                        <ExpensesTable lacamentos={lacamentos} />
                    </div>
                </div>

            </Card>
        )
    }
}

export default withRouter(ConsultaLancamentos);