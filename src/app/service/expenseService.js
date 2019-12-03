import ApiService from '../apiservice'


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
}