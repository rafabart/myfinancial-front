import React from 'react'
import { withRouter } from 'react-router-dom'

import FormGroup from '../../components/form-group'
import Card from '../../components/card'
import SelectMenu from '../../components/selectMenu'

import serviceExpense from '../../app/service/expenseService'

class CadastroLancamentos extends React.Component {


    state = {
        id: null,
        description: '',
        value: '',
        month: '',
        year: '',
        typeExpense: '',
        statusExpense: ''     
    }


    save = () => {
        console.log(this.state)
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


    render() {

        const tipos = this.serviceExpense.obterListaTipo();
        const meses = this.serviceExpense.obterListaMeses();

        return (
            <Card title="Cadastro de Lançamento">

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

                    <div className="col-md-4">
                        <FormGroup id="inputStatus" label="Status: *">
                            <input type="text" className="form-control" disabled className="form-control" name="statusExpense"
                                value={this.state.statusExpense}
                                onChange={this.handleChange}
                                disabled />
                        </FormGroup>
                    </div>


                    <div className="row">
                        <div className="col-md-6">
                            <button className="btn btn-success mr-3" onClick={this.save}>Salvar</button>
                            <button className="btn btn-danger">Cancelar</button>
                        </div>
                    </div>
                </div>
            </Card >
        )
    }
}

export default withRouter(CadastroLancamentos)