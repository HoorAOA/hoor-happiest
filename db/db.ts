import { SQLiteDatabase, Table, openDatabase, enablePromise } from 'react-native-sqlite-storage';


// Enable promise for SQLite
enablePromise(true)

const connectToDatabase = async () => {
  return openDatabase(
    { name: "ros_dealer.db", location: "default" },
    () => {
      console.log("Database connection opened successfully");
    },
    (error) => {
      console.error(error)
      throw Error("Could not connect to database")
    }
  )
}

const dbInitializer = async (db: SQLiteDatabase) => {
  const userPreferencesQuery = `
      CREATE TABLE IF NOT EXISTS user_preferences (
          key TEXT PRIMARY KEY,
          value TEXT
      )
    `

    const languagesQuery = `
      CREATE TABLE IF NOT EXISTS languages (
          language_id TEXT PRIMARY KEY,
          language_name TEXT
      )
    `

  try {
    await db.executeSql(userPreferencesQuery)
    await db.executeSql(languagesQuery)
  } catch (error) {
    console.error(error)
    throw Error(`Failed to create tables`)
  }
}

// here we get the all table names
const getTableNames = async (db: SQLiteDatabase): Promise<string[]> => {
  try {
    const tableNames: string[] = []
    const results = await db.executeSql(
      "SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'"
    )
    results?.forEach((result) => {
      for (let index = 0; index < result.rows.length; index++) {
        tableNames.push(result.rows.item(index).name)
      }
    })
    return tableNames
  } catch (error) {
    console.error(error)
    throw Error("Failed to get table names from database")
  }
}

const removeTable = async (db: SQLiteDatabase, tableName: Table) => {
  const query = `DROP TABLE IF EXISTS ${tableName}`
  try {
    await db.executeSql(query)
  } catch (error) {
    console.error(error)
    throw Error(`Failed to drop table ${tableName}`)
  }
}

export { connectToDatabase, dbInitializer, getTableNames, removeTable }