import React from 'react';

//Importando as views do projeto
import Login from '../views/login';
import FormUser from '../views/formUser';
import Home from '../views/home';
import FormFindExpenses from '../views/expenses/formFindExpenses';
import FormExpenses from '../views/expenses/formExpenses';
import { AuthConsumer } from '../main/provedorAutenticado'

//Obtendo recursos com destructuring(ES6)
import { Route, Switch, HashRouter, Redirect } from 'react-router-dom';


function RotaAutenticada({ component: Component, isUsuarioAutenticado, ...props }) {
    return (
        <Route {...props} render={(componentProps) => {
            if (isUsuarioAutenticado) {
                return (
                    <Component {...componentProps} />
                )
            } else {
                return (
                    <Redirect to={{ pathname: '/login', state: { from: componentProps.location } }} />
                )
            }
        }} />
    )
}


//Configurando os andPoints da app, semelhante a classe @Controller do Spring.
//Recebe uma requisição URL e devolve um componente.
function RouterUrl(props) {
    return (

        <HashRouter>
            <Switch>
                <Route path="/login" component={Login} />
                <Route path="/formUser" component={FormUser} />
                <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado} path="/formFindExpenses" component={FormFindExpenses} />
                <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado} path="/home" component={Home} />

                {/* :id? o ponto de interrogação define que esse parametro passado por 
                URL é opcional, se não tiver 'id' no link, ele usa apenas '/formExpenses'*/}
                <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado} path="/formExpenses/:id?" component={FormExpenses} />
            </Switch>
        </HashRouter>

    )
}

export default () => (
    <AuthConsumer>
        {(context) => (<RouterUrl isUsuarioAutenticado={context.isAutenticado} />)}
    </AuthConsumer>
)