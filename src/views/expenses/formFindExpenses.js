import React from 'react'
import { withRouter } from 'react-router-dom'
import Card from '../../components/card'
import FormGroup from '../../components/form-group'
import SelectMenu from '../../components/selectMenu'
import ExpensesTable from './expensesTable'
import ExpenseService from '../../app/service/expenseService'
import localstoraService from '../../app/service/localstoreService'
import * as messages from '../../components/toastr'

class ConsultaLancamentos extends React.Component {

    state = {
        year: '',
        month: '',
        statusExpense: '',
        typeExpense: '',
        description: '',
        expenses: []
    }

    constructor() {
        super();
        this.expenseService = new ExpenseService();
    }

    buscar = () => {

        if (!this.state.year) {
            messages.messagemErro('O preenchimento do campo Ano é obrigatório!')
            return false
        }

        const usuarioLogado = localstoraService.obterItem('_usuario_logado')

        const lancamentoFiltro = {
            year: this.state.year,
            month: this.state.month,
            statusExpense: this.state.statusExpense,
            typeExpense: this.state.typeExpense,
            description: this.state.description,
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

        const meses = this.expenseService.obterListaMeses();

        const tipos = this.expenseService.obterListaTipo();

        const status = this.expenseService.obterListaStatus();

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
                            <FormGroup htmlFor="inputDescription" label="Descrição: ">

                                <input id="inputDescription" type="text"
                                    name="ano"
                                    className="form-control"
                                    placeholder="Digite a Descrição"
                                    value={this.state.description}
                                    onChange={e => this.setState({ description: e.target.value })} />

                            </FormGroup>
                            <FormGroup htmlFor="inputMes" label="Mês: ">

                                <SelectMenu className="form-control"
                                    lista={meses}
                                    value={this.state.month}
                                    onChange={e => this.setState({ month: e.target.value })} />

                            </FormGroup>
                            <FormGroup htmlFor="inputTipo" label="Tipo de Lançamento: ">

                                <SelectMenu className="form-control"
                                    lista={tipos}
                                    value={this.state.typeExpense}
                                    onChange={e => this.setState({ typeExpense: e.target.value })} />

                            </FormGroup>
                            <FormGroup htmlFor="inputStatus" label="Status do Lançamento: ">

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