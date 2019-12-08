import ApiService from '../apiservice'

import ErroValidacao from '../exception/erroValidacao'

class UsuarioService extends ApiService {

    constructor() {
        super('/api/users')
    }


    autenticar(credenciais) {
        return this.post('/authentication', credenciais)
    }


    obterSaldoPorUsuario(id) {
        return this.get(`/${id}/balance`)
    }

    salvar(usuario) {
        return this.post('/', usuario);
    }

    validar(usuario) {
        const erros = []

        //Verifica se o valor é nulo.
        if (!usuario.name) {
            erros.push('O campo Nome é obrigatório!')
        }

        if (!usuario.email) {
            erros.push('O campo Email é obrigatório!')
        } else if (!usuario.email.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]/)) {
            erros.push('Informme um email válido!')
        }

        if (!usuario.password || !usuario.passwordAgain) {
            erros.push('Digite a senha 2 vezes!')
        } else if (usuario.password !== usuario.passwordAgain) {
            erros.push('As senhas devem ser iguais!')
        }

        if (erros && erros.length > 0) {
            throw new ErroValidacao(erros)
        }
    }

}

export default UsuarioService;