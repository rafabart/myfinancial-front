//Obrigatório em todos os arquivos js.
import React from 'react';

//Rotea os and point da app
import RouterUrl from './routerUrl'
import Navbar from '../components/navbar'

import 'bootswatch/dist/darkly/bootstrap.css';
import '../custom.css';


class App extends React.Component {

  render() {
    //Método que retorna um único componente.
    return (
      // Cada div é um nó, e só é possível um nó, caso queira usar mais divs,
      // é necessário cria-las dentro de uma unica div ou usar entre tag vazias <> </>.
      <>

        <Navbar />

        <div className="container">
          <RouterUrl />
        </div>

      </>
    );
  }
}

export default App;