import React from 'react';
import ReactDOM from 'react-dom';
import App from './main/App';

/*
Inicia a aplicação web Single Page, o 'render' é uma função
que recebe 2 paramentros: 1 aplicação, 1 pagina html para injetar a aplicação.

root -> é o id da página 'index.html' que esta na pasta 'public'.
*/

ReactDOM.render(<App />, document.getElementById('root'));
