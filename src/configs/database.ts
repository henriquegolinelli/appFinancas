import SQLite from "react-native-sqlite-storage"

SQLite.enablePromise(true)

export const testeDB = async () => {
    await getDB()
    await resetDB()

    createTables()
}

export const getDB = async () => {
    return SQLite.openDatabase({name: "teste", location: "default"})
}

const resetDB = async () => {
    await SQLite.deleteDatabase({name: "teste", location: "default"})
}

export const createTables = async () => {
    let teste = await getDB()

    await teste.executeSql("CREATE TABLE IF NOT EXISTS teste(id INTEGER PRIMARY KEY AUTOINCREMENT, nome VARCHAR(30))")
    await teste.executeSql("INSERT INTO teste(nome) VALUES(?)", ["teste"])

    let result: SQLite.ResultSet = (await teste.executeSql("SELECT * FROM teste"))[0]
    
    for (let i = 0; i < result.rows.length; i++) {
        console.log(result.rows.item(i))
    } 
}