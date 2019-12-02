import ApiService from '../apiservice'


export default class LancamentoService extends ApiService {


    constructor() {
        super('/api/expenses')
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

        return this.get(params)

    }
}