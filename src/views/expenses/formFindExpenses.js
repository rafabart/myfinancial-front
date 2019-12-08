import React from 'react'
import { withRouter } from 'react-router-dom'

import Card from '../../components/card'
import FormGroup from '../../components/form-group'
import SelectMenu from '../../components/selectMenu'
import ExpensesTable from './expensesTable'
import ExpenseService from '../../app/service/expenseService'
import localstoraService from '../../app/service/localstoreService'

import * as messages from '../../components/toastr'

import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'

class ConsultaLancamentos extends React.Component {

    state = {
        year: '',
        month: '',
        statusExpense: '',
        typeExpense: '',
        description: '',
        showConfirmDialog: false,
        lancamentoDeletar: {},
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

                const lista = resposta.data

                if (lista.length < 1) {
                    messages.messagemErro("Nenhum resultado encontrado!")
                }
                this.setState({ expenses: lista })
            }).catch(error => {
                console.log(error)
            })
    }

    editar = (id) => {
        this.props.history.push(`/formExpenses/${id}`)
    }


    abrirConfirmação = (lancamento) => {
        this.setState({ showConfirmDialog: true, lancamentoDeletar: lancamento })
    }

    cancelarDelecao = (lancamento) => {
        this.setState({ showConfirmDialog: false, lancamentoDeletar: lancamento })
    }


    deletar = () => {
        this.expenseService
            .deletar(this.state.lancamentoDeletar.id)
            .then(response => {

                const expenses = this.state.expenses;
                const index = expenses.indexOf(this.state.lancamentoDeletar)
                expenses.splice(index, 1)
                this.setState({ expenses: expenses, showConfirmDialog: false })

                messages.messagemSucesso('Lançamento deletado com sucesso!');
            }).catch(error => {
                messages.messagemErro('Ocorreu um erro ao tentar deletar o Lançamento!')
            })
    }

    preparaFormularioCadastro = () => {
        this.props.history.push('/formExpenses')
    }

    alterarStatus = (lancamento, status) => {
        this.expenseService
            .alterarStatus(lancamento.id, status)
            .then(response => {
                const lancamentos = this.state.expenses;
                const index = lancamentos.indexOf(lancamento);

                if (index !== -1) {
                    lancamento['statusExpense'] = status;
                    lancamentos[index] = lancamento;
                    this.setState({ lancamento })
                }
                messages.messagemSucesso("Status atualizado com sucesso!")
            })
    }

    render() {

        const meses = this.expenseService.obterListaMeses();

        const tipos = this.expenseService.obterListaTipo();

        const status = this.expenseService.obterListaStatus();

        const footer = (
            <div>
                <Button label="Confirmar" icon="pi pi-check" onClick={this.deletar} />
                <Button label="Cancelar" icon="pi pi-times" onClick={this.cancelarDelecao} className="p-button-secondary" />
            </div>
        )

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

                            <button onClick={this.buscar} className="btn btn-success mr-3">
                                <i className="pi pi-search"></i>Buscar</button>
                            <button onClick={this.preparaFormularioCadastro} className="btn btn-danger">
                                <i className="pi pi-plus"></i>Cadastrar</button>

                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-12">
                        <div className="bs-component">
                            <ExpensesTable lancamentos={this.state.expenses}
                                deletarAction={this.abrirConfirmação}
                                editarAction={this.editar}
                                alterarStatus={this.alterarStatus} />
                        </div>
                    </div>
                    <div>
                        <Dialog header="Confirmação"
                            visible={this.state.showConfirmDialog}
                            style={{ width: '50vw' }}
                            footer={footer}
                            modal={true}
                            onHide={() => this.setState({ showConfirmDialog: false })}>
                            Confirma a exclusão deste lançamento?
                        </Dialog>
                    </div>
                </div>

            </Card>
        )
    }
}

export default withRouter(ConsultaLancamentos);