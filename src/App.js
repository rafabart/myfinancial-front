//Obrigatório em todos os arquivos js.
import React from 'react';

import Login from './views/login';
import FormUser from './views/formUser';

import 'bootswatch/dist/darkly/bootstrap.css';
import './custom.css';

//Os componentes são criados por funções.
function App() {

  //Método que retorna um único componente.
  return (

    //Cada div é um nó, e só é possível um nó, caso queira usar mais divs,
    //é necessário cria-las dentro de uma unica div.
    <div>
      <FormUser />
    </div>
  );
}

export default App;