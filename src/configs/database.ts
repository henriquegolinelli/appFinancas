import SQLite from "react-native-sqlite-storage"

SQLite.enablePromise(true)

export const getDB = async () => {
    return SQLite.openDatabase({name: "teste", location: "default"})
}

const resetDB = async () => {
    await SQLite.deleteDatabase({name: "teste", location: "default"})
}

export const getDBGastos = async (): Promise<Gasto[]> => {
    let gastos: Gasto[] = []

    let teste = await getDB()

    let result: SQLite.ResultSet = (await teste.executeSql("SELECT * FROM teste"))[0]
    
    for (let i = 0; i < result.rows.length; i++) {
        let item = result.rows.item(i)

        gastos.push(item as Gasto)
    }

    return gastos
}


export const initDB = async () => {
    try {
        await resetDB()
    } catch (error) {
        console.log(error)
    }
    
    let db = await getDB()

    await db.executeSql("CREATE TABLE teste (id INTEGER PRIMARY KEY AUTOINCREMENT, nome VARCHAR(30) NOT NULL, descricao VARCHAR(30), preco REAL NOT NULL, data VARCHAR(30) NOT NULL)")

    createGasto({nome: "Coxinha", preco: 20.00, descricao: "comida", data: "12/25/2023"})
    createGasto({nome: "Pera", preco: 5.00, data: "12/25/2023"})
    createGasto({nome: "Pastel", preco: 10.00, descricao: "comida", data: "12/25/2023"})
    createGasto({nome: "Marmita", preco: 50.00, descricao: "comida", data: "12/25/2023"})
    createGasto({nome: "Carne", preco: 9.00, descricao: "comida", data: "12/25/2023"})
}

const createGasto = async (gasto: Gasto) => {
    let db = await getDB()

    await db.executeSql("INSERT INTO teste(nome, descricao, preco, data) VALUES(?, ?, ?, ?)",[gasto.nome, gasto.descricao, gasto.preco, gasto.data])
}