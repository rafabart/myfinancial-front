import React from 'react';
import Card from '../components/card';
import FormGroup from '../components/form-group';

//Permite navegar para outros componentes.
import { withRouter } from 'react-router-dom';

//Permite fazer requisições http (get, post, put...)
import axios from 'axios';


//Componente de classe
class Login extends React.Component {

    state = {
        email: '',
        password: '',
        messageError: ''
    }



    /*
    async -> palavra reservada para indicar que a função é assincrona.
    
    await -> define que só podera seguir para próxima linha ou instrução
        quando a função com a notação await for comcluída.(async requerido na
        assinatura da funçao)
    */

    login = async () => {
        axios
            .post('http://localhost:8080/api/users/authentication', {
                email: this.state.email,
                password: this.state.password
            }).then(response => {
                this.props.history.push("/home")
            }).catch(error => {
                this.setState({ messageError: error.response.data })
            })
    }

    prepareFormUser = () => {
        // history.push é uma funcionalidade extendida de withRouter
        this.props.history.push('/formUser')
    }



    render() {

        return (

            <div className="row">
                <div className="col-md-6" style={{ position: 'relative', left: '300px' }}>
                    <div className="bs-docs-section">

                        <Card title="Login">

                            <div className="row">
                                <span>{this.state.messageError}</span>
                            </div>

                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="bs-component">
                                        <fieldset>

                                            <FormGroup htmlFor="inputEmail" label="Email: *">
                                                <input id="inputEmail" type="email" className="form-control"
                                                    aria-describedby="emailHelp" placeholder="Digite o Email"
                                                    value={this.state.email}
                                                    onChange={e => this.setState({ email: e.target.value })} />
                                            </FormGroup>

                                            <FormGroup htmlFor="inputPassword" label="Senha: *">
                                                <input id="inputPassword" type="password" className="form-control"
                                                    placeholder="Digite a Senha"
                                                    value={this.state.password}
                                                    onChange={e => this.setState({ password: e.target.value })} />
                                            </FormGroup>

                                            <button onClick={this.login} className="btn btn-success mr-3">Entrar</button>
                                            <button onClick={this.prepareFormUser} className="btn btn-danger">Cadastrar</button>

                                        </fieldset>
                                    </div>
                                </div>
                            </div>

                        </Card>

                    </div>
                </div>
            </div>

        )

    }

}

export default withRouter(Login);