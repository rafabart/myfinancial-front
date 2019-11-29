import React from 'react';

//Importando as views do projeto
import Login from '../views/login';
import FormUser from '../views/formUser';
import Home from '../views/home';
import FormFindExpenses from '../views/expenses/formFindExpenses';

//Obtendo recursos com destructuring(ES6)
import { Route, Switch, HashRouter } from 'react-router-dom';


//Configurando os andPoints da app, semelhandte a classe @Controller do Spring.
//Recebe uma requisição URL e devolve um componente.
function RouterUrl() {
    return (

        <HashRouter>
            <Switch>
                <Route path="/login" component={Login} />
                <Route path="/formUser" component={FormUser} />
                <Route path="/formFindExpenses" component={FormFindExpenses} />
                <Route path="/home" component={Home} />
            </Switch>
        </HashRouter>

    )
}

export default RouterUrl;