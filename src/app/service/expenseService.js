import ApiService from '../apiservice'

import ErroValidacao from '../exception/erroValidacao'


export default class LancamentoService extends ApiService {


    constructor() {
        super('/api/expenses')
    }

    obterListaTipo() {
        return [
            { label: 'Selecione...', value: '' },
            { label: 'Despesa', value: 'DESPESA' },
            { label: 'Receita', value: 'RECEITA' }
        ]
    }


    obterListaStatus() {
        return [
            { label: 'Selecione...', value: '' },
            { label: 'Cancelado', value: 'CANCELADO' },
            { label: 'Efetivado', value: 'EFETIVADO' },
            { label: 'Pendente', value: 'PENDENTE' }
        ]
    }


    obterListaMeses() {
        return [
            { label: 'Selecione...', value: '' },
            { label: 'Janeiro', value: '1' },
            { label: 'Fevereiro', value: '2' },
            { label: 'Março', value: '3' },
            { label: 'Abril', value: '4' },
            { label: 'Maio', value: '5' },
            { label: 'Junho', value: '6' },
            { label: 'Julho', value: '7' },
            { label: 'Agosto', value: '8' },
            { label: 'Setembro', value: '9' },
            { label: 'Outubro', value: '10' },
            { label: 'Novembro', value: '11' },
            { label: 'Dezembro', value: '12' }
        ]
    }


    consultar(lancamentoFiltro) {

        let params = `?year=${lancamentoFiltro.year}`

        if (lancamentoFiltro.month) {
            params = `${params}&month=${lancamentoFiltro.month}`
        }

        if (lancamentoFiltro.typeExpense) {
            params = `${params}&typeExpense=${lancamentoFiltro.typeExpense}`
        }

        if (lancamentoFiltro.statusExpense) {
            params = `${params}&statusExpense=${lancamentoFiltro.statusExpense}`
        }

        if (lancamentoFiltro.userId) {
            params = `${params}&userId=${lancamentoFiltro.userId}`
        }

        if (lancamentoFiltro.description) {
            params = `${params}&description=${lancamentoFiltro.description}`
        }

        return this.get(params)

    }


    deletar(id) {
        return this.delete(`/${id}`)
    }

    salvar(lancamento) {
        return this.post('/', lancamento)
    }

    atualizar(lancamento) {
        return this.put(`/${lancamento.id}`, lancamento)
    }

    alterarStatus(id, status) {
        return this.put(`/${id}/updateStatusExpense`, { status })
    }

    obterPorId(id) {
        return this.get(`/${id}`)
    }

    validar(lancamento) {
        const erros = []

        if (!lancamento.year) {
            erros.push("Informe o Ano!")
        }

        if (!lancamento.month) {
            erros.push("Informe o Mês!")
        }

        if (!lancamento.description) {
            erros.push("Informe a Descrição!")
        }

        if (!lancamento.value) {
            erros.push("Informe o Valor!")
        }

        if (!lancamento.typeExpense) {
            erros.push("Informe o Tipo do lançamento!")
        }


        if (erros && erros.length > 0) {
            throw new ErroValidacao(erros)
        }
    }


}