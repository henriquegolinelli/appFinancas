import { TipoReceita } from "./tipoReceita"

/**
 * Transacao
 * 
 * @abstract Transacao
 */
export abstract class Transacao {
    id?: number
    descricao: string
    tipo: TipoReceita
    valor: number
    data: string
    categoriaId: number
    contaId: number
}