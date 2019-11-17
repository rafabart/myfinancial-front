import React from 'react';

//Componente funcional
function FormGroup(props) {

    return (

        <div className="form-group">

            {/* Não pode usar this.props aqui, porque o props esta vindo por parametro da 'função function FormGroup(props)' */}
            <label htmlFor={props.htmlFor}>{props.label}</label>
            {props.children}

        </div>
    )

}

export default FormGroup;