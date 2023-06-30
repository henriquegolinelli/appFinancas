import { Transacao } from "../model/transacao"

/**
 * StateType
 * 
 * @abstract StateType
 */
export abstract class StateType {
    transacoes: Transacao[]
    count: number
}