import { SQLiteDatabase, ResultSet } from 'react-native-sqlite-storage';
import UserPreference from '../data/UserPreference';

const addSharedPreferencesHandler = async (db: SQLiteDatabase, userPreferences: UserPreference[]) => {
    let insertQuery = `
     INSERT OR REPLACE INTO user_preferences (key, value)
     VALUES
   `

    let dataArray : (string | string)[] = []
    
    userPreferences.forEach((userPreference, index) => {
        insertQuery += `(?, ?)${index < userPreferences.length - 1 ? ',' : ''} `;
        dataArray.push(userPreference.key, userPreference.value);
    });
    
    try {
        return db.executeSql(insertQuery, dataArray)
    } catch (error) {
        console.error(error)
        throw Error("Failed to add shared preferences")
    }
}

const getSharedPreferencesHandler = async (db: SQLiteDatabase): Promise<UserPreference[]> => {
    try {
        const userPreference: UserPreference[] = []
        const results = await db.executeSql("SELECT * FROM user_preferences")
        results?.forEach((result : ResultSet) => {
            for (let index = 0; index < result.rows.length; index++) {
                userPreference.push(result.rows.item(index))
            }
        })
        return userPreference
    } catch (error) {
        console.error(error)
        throw Error("Failed to get shared preferences from database")
    }
}

const getSingleUserPreference = async (
    db: SQLiteDatabase,
    keyName: string
): Promise<string | null> => {
    const query = `SELECT * FROM user_preferences WHERE key = '${keyName}'`
    try {
        const results = await db.executeSql(query)
        if (results[0]?.rows?.length) {
            return results[0].rows.item(0).value
        } else {
            return ''
        }
    } catch (error) {
        console.error(error)
        throw Error(`Failed to get reference from database`)
    }
}

export { addSharedPreferencesHandler, getSharedPreferencesHandler, getSingleUserPreference };