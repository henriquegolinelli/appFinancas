/**
 * isAtualMes()
 * 
 * Verificar se o mês do db é igual ao do getMonth(),
 * como no db é armazenado com dois digitos xx, é preciso
 * fazer adicionar um zero a esquerda do mês caso ele
 * seja de apenas um digito
 * 
 * @param mes `date[1]`
 * @returns `boolean`
 */
export const isAtualMes = (mes: string): boolean => {
    // Mês Atual
    let atualMes: string = (new Date().getMonth() + 1).toString()
    atualMes = ("0" + atualMes).slice(-2)

    if (mes == atualMes) return true

    return false
}

/**
 * toDateString()
 * 
 * Transforma o `Date` na versão armazenada no
 * db, xx/xx/xxxx
 * 
 * @param data date do setState()
 * @returns `xx/xx/xxxx`
 */
export const toDateString = (data: Date): string => {
    let date: Date = data

    let dia: number = data.getDate()
    let mes: number = data.getMonth() + 1
    let ano: number = data.getFullYear()

    let dateString = ("0" + dia).slice(-2) + "/" + ("0" + mes).slice(-2) + "/" + ano

    return dateString
}