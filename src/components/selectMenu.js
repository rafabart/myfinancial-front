import React from 'react'


//Criando componente com arrowfunction
export default (props) => {

    const options = props.lista.map((option, index) => {
        return (
            <option key={index} value={option.value}>{option.label}</option>
        )
    })

    return (
        /*
        Usando o spread operator para setar todos os valores passados 
        por parametro para o select
        */
        <select {...props} >
            {options}
        </select>
    )
}