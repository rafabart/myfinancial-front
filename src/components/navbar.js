import React from 'react';
import NavbarItem from './navbarItem';

function Navbar() {
    return (

        <div className="navbar navbar-expand-lg fixed-top navbar-dark bg-primary">
            <div className="container">

                <a href="https://bootswatch.com/" className="navbar-brand">Minhas Finanças</a>

                <button className="navbar-toggler" type="button" data-toggle="collapse"
                    data-target="#navbarResponsive" aria-controls="navbarResponsive"
                    aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarResponsive">

                    <ul className="navbar-nav">

                        {/* Deve-se usar o '#/' no inicio da url por causa do componente HashRouter
                        que esta sendo usado para rotear as requisições de url */}
                        <NavbarItem href="#/home" label="Home" />
                        <NavbarItem href="#/formUser" label="Usuários" />
                        <NavbarItem href="#/formFindExpenses"  label="Lançamentos" />
                        <NavbarItem href="#/login" label="Login" />

                    </ul>

                </div>
            </div>
        </div>

    )
}

export default Navbar;