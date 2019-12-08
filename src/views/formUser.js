import React from 'react'

import Card from '../components/card'
import FormGroup from '../components/form-group'
import UsuarioService from '../app/service/usuarioService'

import { withRouter } from 'react-router-dom'
import { messagemSucesso, messagemErro } from '../components/toastr'


class FormUser extends React.Component {


    state = {
        name: '',
        email: '',
        password: '',
        passwordAgain: ''
    }

    constructor() {
        super();
        this.usuarioService = new UsuarioService();
    }

    save = () => {

        //Recebe valores por 'Desestruturação'
        const { name, email, password, passwordAgain } = this.state
        const usuario = { name, email, password, passwordAgain }

        try {
            this.usuarioService.validar(usuario)
        } catch (erro) {
            const mensagens = erro.mensagens
            mensagens.forEach(msg => messagemErro(msg))
            return false
        }

        this.usuarioService.salvar(usuario)
            .then(response => {
                messagemSucesso('Usuário cadastro com sucesso! Faça o login para acessar o sistema!')
                this.props.history.push('/login')
            }).catch(error => {
                messagemErro(error.response.data)
            })
    }

    cancel = () => {
        // history.push é uma funcionalidade extendida de withRouter
        this.props.history.push('/login')
    }

    render() {
        return (

            <Card title="Cadastro de Usuários">

                <div className="row">
                    <div className="col-lg-12">
                        <div className="bs-component">

                            <FormGroup htmlFor="inputName" label="Nome: *">
                                <input id="inputName" type="text"
                                    name="name"
                                    className="form-control"
                                    placeholder="Digite o Nome"
                                    onChange={e => this.setState({ name: e.target.value })} />
                            </FormGroup>

                            <FormGroup htmlFor="inputEmail" label="Email: *">
                                <input id="inputEmail" type="email"
                                    name="email"
                                    className="form-control"
                                    placeholder="Digite o Email"
                                    onChange={e => this.setState({ email: e.target.value })} />
                            </FormGroup>

                            <FormGroup htmlFor="inputPassword" label="Password: *">
                                <input id="inputPassword" type="password"
                                    name="password"
                                    className="form-control"
                                    placeholder="Digite o Password"
                                    onChange={e => this.setState({ password: e.target.value })} />
                            </FormGroup>

                            <FormGroup htmlFor="inputPasswordAgain" label="Repita a senha: *">
                                <input id="inputPasswordAgain" type="password"
                                    name="password"
                                    className="form-control"
                                    placeholder="Digite o Password"
                                    onChange={e => this.setState({ passwordAgain: e.target.value })} />
                            </FormGroup>

                            <button onClick={this.save} className="btn btn-success mr-3">
                                <i className="pi pi-save"></i>Salvar</button>
                            <button onClick={this.cancel} className="btn btn-danger">
                                <i className="pi pi-times"></i>Cancelar</button>

                        </div>
                    </div>
                </div>

            </Card>

        )
    }
}

export default withRouter(FormUser);