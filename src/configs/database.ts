import SQLite from "react-native-sqlite-storage"
import { TipoReceita } from "../model/tipoReceita"
import { Transacao } from "../model/transacao"

SQLite.enablePromise(true)

export const getDB = async () => {
    return SQLite.openDatabase({ name: "teste", location: "default" })
}

const resetDB = async () => {
    await SQLite.deleteDatabase({ name: "teste", location: "default" })
}

export const getDBTransacoes = async (): Promise<Transacao[]> => {
    let transacoes: Transacao[] = []

    let teste = await getDB()

    let result: SQLite.ResultSet = (await teste.executeSql("SELECT * FROM Transacoes"))[0]

    for (let i = 0; i < result.rows.length; i++) {
        let item = result.rows.item(i)

        transacoes.push(item as Transacao)
    }

    return transacoes
}


export const initDB = async () => {
    try {
        await resetDB()
    } catch (error) {
        console.log(error)
    }

    let db = await getDB()

    await db.executeSql("CREATE TABLE Transacoes(id INTEGER PRIMARY KEY AUTOINCREMENT, descricao TEXT, valor DECIMAL(10,2), data DATETIME, tipo TEXT, categoriaId INT, contaId INT, FOREIGN KEY (CategoriaID) REFERENCES Categorias(ID), FOREIGN KEY (ContaID) REFERENCES Contas(ID))")

    createTransacao({ descricao: "Coxinha", valor: 20.00, tipo: TipoReceita.despesa, data: "12/25/2023", categoriaId: 1, contaId: 1 })
    createTransacao({ descricao: "Pera", valor: 5.00, tipo: TipoReceita.despesa, data: "12/25/2023", categoriaId: 1, contaId: 1 })
    createTransacao({ descricao: "Pastel", valor: 10.00, tipo: TipoReceita.despesa, data: "12/25/2023", categoriaId: 1, contaId: 1 })
    createTransacao({ descricao: "Marmita", valor: 50.00, tipo: TipoReceita.despesa, data: "12/25/2023", categoriaId: 1, contaId: 1 })
    createTransacao({ descricao: "Carne", valor: 9.00, tipo: TipoReceita.despesa, data: "12/25/2023", categoriaId: 1, contaId: 1 })
}

const createTransacao = async (transacao: Transacao) => {
    let db = await getDB()

    await db.executeSql("INSERT INTO Transacoes(descricao, valor, data, tipo, categoriaId, contaId) VALUES(?, ?, ?, ?, ?, ?)", [transacao.descricao, transacao.valor, transacao.data, transacao.tipo, transacao.categoriaId, transacao.contaId])
}