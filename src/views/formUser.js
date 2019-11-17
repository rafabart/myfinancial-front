import React from 'react';

import Card from '../components/card';
import FormGroup from '../components/form-group';


class FormUser extends React.Component {


    state = {
        name: '',
        email: '',
        password: '',
        passwordAgain: ''
    }

    save = () => {
        console.log('User: ', this.state);
    }

    render() {
        return (

            <div className="container">
                <Card title="Cadastro de Usuários">

                    <div className="row">
                        <div className="col-lg-12">
                            <div className="bs-component">

                                <FormGroup htmlFor="inputName" label="Nome: *">
                                    <input id="inputName" type="text"
                                        name="name"
                                        className="form-control"
                                        placeholder="Digite o Nome"
                                        // value={this.state.name}
                                        onChange={e => this.setState({ name: e.target.value })} />
                                </FormGroup>

                                <FormGroup htmlFor="inputEmail" label="Email: *">
                                    <input id="inputEmail" type="email"
                                        name="email"
                                        className="form-control"
                                        placeholder="Digite o Email"
                                        // value={this.state.email}
                                        onChange={e => this.setState({ email: e.target.value })} />
                                </FormGroup>

                                <FormGroup htmlFor="inputPassword" label="Password: *">
                                    <input id="inputPassword" type="password"
                                        name="password"
                                        className="form-control"
                                        placeholder="Digite o Password"
                                        // value={this.state.password}
                                        onChange={e => this.setState({ password: e.target.value })} />
                                </FormGroup>

                                <FormGroup htmlFor="inputPasswordAgain" label="Repita a senha: *">
                                    <input id="inputPasswordAgain" type="password"
                                        name="password"
                                        className="form-control"
                                        placeholder="Digite o Password"
                                        // value={this.state.passwordAgain}
                                        onChange={e => this.setState({ passwordAgain: e.target.value })} />
                                </FormGroup>

                                <button onClick={this.save} className="btn btn-success mr-3">Salvar</button>
                                <button className="btn btn-danger">Cancelar</button>

                            </div>
                        </div>
                    </div>

                </Card>
            </div>

        )
    }
}

export default FormUser;