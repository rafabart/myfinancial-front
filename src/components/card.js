import React from 'react';

//Componente de classe
class Card extends React.Component {

    render() {
        return (

            <div className="card mb-3">

                {/* this.props é responsável por injetar o parametros da tag personalizada
                que vem do arquivo(login.js - <Card>) que faz a requisição deste componente(card.js - class Card).  */}
                <h3 className="card-header">{this.props.title}</h3>

                {/* this.props.children injeta o conteúdo da tag do arquivos que faz a requisição. <Card>conteúdo</Card> */}
                <div className="card-body">
                    {this.props.children}
                </div>
            </div>

        )
    }

}

export default Card