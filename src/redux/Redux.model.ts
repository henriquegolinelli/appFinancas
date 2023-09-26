import { Categoria } from "../model/categoria"
import { Conta } from "../model/conta"
import { Transacao } from "../model/transacao"

/**
 * StateType
 * 
 * @abstract StateType
 */
export abstract class StateType {
    transacoes: Transacao[]
    tempTransacoes: Transacao[]
    contaTransacoes: Transacao[]
    categorias: Categoria[]
    count: number
    contas: Conta[]
}