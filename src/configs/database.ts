import SQLite from "react-native-sqlite-storage"
import { TipoReceita } from "../model/tipoReceita"
import { Transacao } from "../model/transacao"
import { Conta } from "../model/conta"
import { Categoria } from "../model/categoria"
import { IconEnum } from "../model/iconEnum"

SQLite.enablePromise(true)

export const getDB = async () => {
    return SQLite.openDatabase({ name: "teste", location: "default" })
}

const resetDB = async () => {
    await SQLite.deleteDatabase({ name: "teste", location: "default" })
}

export const getDBTransacoes = async (): Promise<Transacao[]> => {
    let transacoes: Transacao[] = []

    let db = await getDB()

    let result: SQLite.ResultSet = (await db.executeSql("SELECT * FROM Transacoes"))[0]

    for (let i = 0; i < result.rows.length; i++) {
        let item = result.rows.item(i)

        transacoes.push(item as Transacao)
    }

    return transacoes
}

export const getDBCategorias = async (): Promise<Categoria[]> => {
    let categorias: Categoria[] = []

    let db = await getDB()

    let result: SQLite.ResultSet = (await db.executeSql("SELECT * FROM Categorias"))[0]

    for (let i = 0; i < result.rows.length; i++) {
        let item = result.rows.item(i)

        categorias.push(item as Categoria)
    }

    return categorias
}

export const getDBContas = async (): Promise<Conta[]> => {
    let conta: Conta[] = []

    let db = await getDB()

    let result: SQLite.ResultSet = (await db.executeSql("SELECT * FROM Contas"))[0]

    for (let i = 0; i < result.rows.length; i++) {
        let item = result.rows.item(i)

        conta.push(item as Conta)
    }

    return conta
}


export const initDB = async () => {
    try {
        await resetDB()
    } catch (error) {
        console.log(error)
    }

    let db = await getDB()

    // Transacoes
    await db.executeSql("CREATE TABLE Transacoes(id INTEGER PRIMARY KEY AUTOINCREMENT, descricao TEXT, valor DECIMAL(10,2), data DATETIME, tipo TEXT, categoriaId INT, contaId INT, FOREIGN KEY (CategoriaID) REFERENCES Categorias(ID), FOREIGN KEY (ContaID) REFERENCES Contas(ID))")

    await createTransacao({ descricao: "Coxinha", valor: -20.00, tipo: TipoReceita.despesa, data: "01/06/2023", categoriaId: 1, contaId: 1 })
    await createTransacao({ descricao: "Pera", valor: -5.00, tipo: TipoReceita.despesa, data: "03/07/2023", categoriaId: 1, contaId: 1 })

    // Categorias
    await db.executeSql("CREATE TABLE Categorias(id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT, tipo TEXT, icone TEXT)")

    await createCategoria({nome: "Alimento", tipo: "despesa", icone: IconEnum.BOX})
    await createCategoria({nome: "Higiene", tipo: "despesa", icone: IconEnum.MENU})
    await createCategoria({nome: "Doação", tipo: "despesa", icone: IconEnum.BOX})

    // Contas
    await db.executeSql("CREATE TABLE Contas(id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT, tipo TEXT)")

    await createConta({nome: "PRINCIPAL", tipo: "CORRENTE"})
    await createConta({nome: "POUPANCA", tipo: "POUPANÇA"})
}

export const createTransacao = async (transacao: Transacao) => {
    let db = await getDB()

    await db.executeSql("INSERT INTO Transacoes(descricao, valor, data, tipo, categoriaId, contaId) VALUES(?, ?, ?, ?, ?, ?)", [transacao.descricao, transacao.valor, transacao.data, transacao.tipo, transacao.categoriaId, transacao.contaId])
}

export const createCategoria = async (categoria: Categoria) => {
    let db = await getDB()

    await db.executeSql("INSERT INTO Categorias(nome, tipo, icone) VALUES(?, ?, ?)", [categoria.nome, categoria.tipo, categoria.icone])
}

export const createConta = async (conta: Conta) => {
    let db = await getDB()

    await db.executeSql("INSERT INTO Contas(nome, tipo) VALUES(?, ?)", [conta.nome, conta.tipo])
}

// Criar deleteCategoria
export const deleteConta = async (id: number) => {
    let db = await getDB();

    await db.executeSql("DELETE FROM Contas WHERE id = ?", [id])
}

// Criar deleteContas
export const deleteCategoria = async (id: number) => {
    let db = await getDB();

    await db.executeSql("DELETE FROM Categorias WHERE id = ?", [id]);
}

// Deleta transacao
export const deleteTransacao = async (id: number) => {
    let db = await getDB();

    await db.executeSql("DELETE FROM Transacoes WHERE id = ?", [id]);
}