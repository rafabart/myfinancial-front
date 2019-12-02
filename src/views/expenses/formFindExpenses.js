import React from 'react'
import { withRouter } from 'react-router-dom'
import Card from '../../components/card'
import FormGroup from '../../components/form-group'
import SelectMenu from '../../components/selectMenu'
import ExpensesTable from './expensesTable'

class ConsultaLancamentos extends React.Component {

    render() {

        state = {
            year: '',
            month: '',
            statusExpense: '',
            typeExpense: ''
        }

        buscar = () => {
            console.log(this.state)
        }

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
            { label: 'Outubro', value: '10' },
            { label: 'Novembro', value: '11' },
            { label: 'Dezembro', value: '12' }
        ]


        const tipos = [
            { label: 'Selecione...', value: '' },
            { label: 'Despesa', value: 'DESPESA' },
            { label: 'Receita', value: 'RECEITA' }
        ]


        const lancamentos = [
            {
                id: 1,
                description: 'Salario',
                value: 50000,
                month: 11,
                typeExpense: 'Receita',
                statusExpense: 'Efetivado'
            }
        ]


        return (

            <Card title="Consulta Lançamentos">

                <div className="row mb-3">
                    <div className="col-lg-12">
                        <div className="bs-component">

                            <FormGroup htmlFor="inputAno" label="Ano: *">

                                <input id="inputAno" type="text"
                                    name="ano"
                                    className="form-control"
                                    placeholder="Digite o Ano"
                                    value={this.state.year}
                                    onChange={e => this.setState({ year: e.target.value })} />

                            </FormGroup>
                            <FormGroup htmlFor="inputMes" label="Mês: *">

                                <SelectMenu className="form-control"
                                    lista={meses}
                                    value={this.state.month}
                                    onChange={e => this.setState({ month: e.target.valueu })} />

                            </FormGroup>
                            <FormGroup htmlFor="inputTipo" label="Tipo de Lançamento: *">
                                <SelectMenu className="form-control"
                                    lista={tipos}
                                    value={this.state.typeExpense}
                                    onChange={e => this.setState({ typeExpense: e.target.valueu })} />
                            </FormGroup>

                            <button onClick={this.buscar} className="btn btn-success mr-3">Buscar</button>
                            <button onClick={this.cancel} className="btn btn-danger">Cancelar</button>

                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-6">
                        <div className="bs-component">
                            <ExpensesTable lancamentos={lancamentos} />
                        </div>
                    </div>
                </div>

            </Card>
        )
    }
}

export default withRouter(ConsultaLancamentos);