import React from 'react'
import { withRouter } from 'react-router-dom'
import * as messages from '../../components/toastr'

import FormGroup from '../../components/form-group'
import Card from '../../components/card'
import SelectMenu from '../../components/selectMenu'

import serviceExpense from '../../app/service/expenseService'
import LocalstoreService from '../../app/service/localstoreService'

class CadastroLancamentos extends React.Component {


    state = {
        id: null,
        description: '',
        value: '',
        month: '',
        year: '',
        typeExpense: '',
        statusExpense: '',
        userId: null,
        atualizando: false
    }

    cancelar = () => {
        this.props.history.push('/formFindExpenses')
    }

    submit = () => {

        const usuarioLogado = LocalstoreService.obterItem('_usuario_logado')

        //Desconstrução
        const { description, value, month, year, typeExpense } = this.state

        const lancamento = { description, value, month, year, typeExpense, userId: usuarioLogado.id };

        try {
            this.serviceExpense.validar(lancamento)
        } catch (erro) {
            const mensagens = erro.mensagens
            mensagens.forEach(msg => messages.messagemErro(msg))
            return false
        }


        this.serviceExpense
            .salvar(lancamento)
            .then(response => {
                this.cancelar()
                messages.messagemSucesso('Lançamento cadastrado com sucesso!')
            }).catch(error => {
                messages.messagemErro(error.response.data)
            })
    }


    atualizar = () => {
        
        //Desconstrução
        const { id, description, value, month, year, typeExpense, statusExpense, userId } = this.state

        const lancamento = { id, description, value, month, year, typeExpense, statusExpense, userId }

        this.serviceExpense
            .atualizar(lancamento)
            .then(response => {
                this.cancelar()
                messages.messagemSucesso('Lançamento atualizado com sucesso!')
            }).catch(error => {
                messages.messagemErro(error.response.data)
            })
    }

    /*
        Recebe os parametros de cada input, e atribui a respectiva variável 
        do state.
    */
    handleChange = (event) => {
        const value = event.target.value
        const name = event.target.name

        this.setState({ [name]: value })
    }


    constructor() {
        super();
        this.serviceExpense = new serviceExpense();
    }

    componentDidMount() {
        const params = this.props.match.params

        if (params.id) {
            this.serviceExpense
                .obterPorId(params.id)
                .then(response => {
                    this.setState({ ...response.data, atualizando: true })
                })
                .catch(error => {
                    messages.messagemErro(error.response.data)
                })
        }
    }


    render() {

        const tipos = this.serviceExpense.obterListaTipo();
        const meses = this.serviceExpense.obterListaMeses();

        return (

            /*this.state.atualizando? é uma condicional ternária que verifica qual titulo usar  */
            < Card title={this.state.atualizando ? 'Atualização de Lançamento' : "Cadastro de Lançamento"} >

                <div className="row">
                    <div className="col-md-12">
                        <FormGroup id="inputDescricao" label="Descrição: *">
                            <input id="inputDescricao" type="text" name="description"
                                value={this.state.description}
                                className="form-control" onChange={this.handleChange} />
                        </FormGroup>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6">
                        <FormGroup id="inputAno" label="Ano: *">
                            <input id="inputAno" type="text" className="form-control" name="year"
                                value={this.state.year}
                                onChange={this.handleChange} />
                        </FormGroup>
                    </div>
                    <div className="col-md-6">
                        <FormGroup id="inputMes" label="Mês: *">
                            <SelectMenu id="inputMes" lista={meses} className="form-control" name="month"
                                value={this.state.month}
                                onChange={this.handleChange} />
                        </FormGroup>
                    </div>
                </div>

                <div className="row">

                    <div className="col-md-4">
                        <FormGroup id="inputValor" label="Valor: *">
                            <input id="inputValor" type="text" className="form-control" name="value"
                                value={this.state.value}
                                onChange={this.handleChange} />
                        </FormGroup>
                    </div>

                    <div className="col-md-4">
                        <FormGroup id="inputTipo" label="Tipo: *">
                            <SelectMenu id="inputTipo" lista={tipos} className="form-control" name="typeExpense"
                                value={this.state.typeExpense}
                                onChange={this.handleChange} />
                        </FormGroup>
                    </div>

                    <div className="col-md-4" hidden={this.state.statusExpense === ''}>
                        <FormGroup id="inputStatus" label="Status: *">
                            <input type="text" className="form-control" name="statusExpense"
                                value={this.state.statusExpense}
                                onChange={this.handleChange}
                                disabled />
                        </FormGroup>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12">

                        {/* Verifica qual botão renderizar, 'Salvar' ou  'Editar' */}
                        {
                            this.state.atualizando ?
                                (
                                    <button className="btn btn-success mr-3" onClick={this.atualizar}>
                                        <i className="pi pi-refresh"></i>Atualizar</button>
                                ) : (
                                    <button className="btn btn-success mr-3" onClick={this.submit}>
                                        <i className="pi pi-save"></i>Salvar</button>
                                )
                        }

                        <button className="btn btn-danger" onClick={this.cancelar}>
                            <i className="pi pi-times"></i>Cancelar</button>
                    </div>
                </div>

            </Card >
        )
    }
}

export default withRouter(CadastroLancamentos)