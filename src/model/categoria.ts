import { IconEnum } from "./iconEnum"

/**
 * Categoria
 * 
 * @abstract categoria
 */
export abstract class Categoria {
    id?: number
    nome: string
    tipo: "despesa" | "receita" | ""
    icone: IconEnum | "swap-outline"
}