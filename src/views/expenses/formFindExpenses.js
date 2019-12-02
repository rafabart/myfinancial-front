import React from 'react'
import { withRouter } from 'react-router-dom'
import Card from '../../components/card'
import FormGroup from '../../components/form-group'
import SelectMenu from '../../components/selectMenu'
import ExpensesTable from './expensesTable'
import ExpenseService from '../../app/service/expenseService'
import localstoraService from '../../app/service/localstoreService'

class ConsultaLancamentos extends React.Component {

    state = {
        year: '',
        month: '',
        statusExpense: '',
        typeExpense: '',
        expenses: []
    }

    constructor() {
        super();
        this.expenseService = new ExpenseService();
    }

    buscar = () => {

        const usuarioLogado = localstoraService.obterItem('_usuario_logado')

        const lancamentoFiltro = {
            year: this.state.year,
            month: this.state.month,
            statusExpense: this.state.statusExpense,
            typeExpense: this.state.typeExpense,
            userId: usuarioLogado.id
        }

        this.expenseService
            .consultar(lancamentoFiltro)
            .then(resposta => {
                this.setState({ expenses: resposta.data })
            }).catch(error => {
                console.log(error)
            })
    }

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
            { label: 'Outubro', value: '10' },
            { label: 'Novembro', value: '11' },
            { label: 'Dezembro', value: '12' }
        ]


        const tipos = [
            { label: 'Selecione...', value: '' },
            { label: 'Despesa', value: 'DESPESA' },
            { label: 'Receita', value: 'RECEITA' }
        ]

        const status = [
            { label: 'Selecione...', value: '' },
            { label: 'Cancelado', value: 'CANCELADO' },
            { label: 'Efetivado', value: 'EFETIVADO' },
            { label: 'Pendente', value: 'PENDENTE' }
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
                                    onChange={e => this.setState({ month: e.target.value })} />

                            </FormGroup>
                            <FormGroup htmlFor="inputTipo" label="Tipo de Lançamento: *">

                                <SelectMenu className="form-control"
                                    lista={tipos}
                                    value={this.state.typeExpense}
                                    onChange={e => this.setState({ typeExpense: e.target.value })} />

                            </FormGroup>
                            <FormGroup htmlFor="inputStatus" label="Status do Lançamento: *">

                                <SelectMenu className="form-control"
                                    lista={status}
                                    value={this.state.stateExpense}
                                    onChange={e => this.setState({ stateExpense: e.target.value })} />

                            </FormGroup>

                            <button onClick={this.buscar} className="btn btn-success mr-3">Buscar</button>
                            <button onClick={this.cancel} className="btn btn-danger">Cancelar</button>

                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-12">
                        <div className="bs-component">
                            <ExpensesTable lancamentos={this.state.expenses} />
                        </div>
                    </div>
                </div>

            </Card>
        )
    }
}

export default withRouter(ConsultaLancamentos);