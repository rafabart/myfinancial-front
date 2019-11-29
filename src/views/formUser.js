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

    validar() {

        const msgs = []

        //Verifica se o valor é nulo.
        if (!this.state.name) {
            msgs.push('O campo Nome é obrigatório!')
        }

        if (!this.state.email) {
            msgs.push('O campo Email é obrigatório!')
        } else if (!this.state.email.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]/)) {
            msgs.push('Informme um email válido!')
        }

        if (!this.state.password || !this.state.passwordAgain) {
            msgs.push('Digite a senha 2 vezes!')
        } else if (this.state.password !== this.state.passwordAgain) {
            msgs.push('As senhas devem ser iguais!')
        }

        return msgs;
    }


    save = () => {

        const msgs = this.validar()

        //verifica se existem mensagens de erros.
        if (msgs && msgs.length > 0) {
            msgs.forEach((msg, index) => {
                messagemErro(msg)
            })
            return false
        }

        const usuario = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password
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

                            <button onClick={this.save} className="btn btn-success mr-3">Salvar</button>
                            <button onClick={this.cancel} className="btn btn-danger">Cancelar</button>

                        </div>
                    </div>
                </div>

            </Card>

        )
    }
}

export default withRouter(FormUser);