import ApiService from '../apiservice'

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

}

export default UsuarioService;