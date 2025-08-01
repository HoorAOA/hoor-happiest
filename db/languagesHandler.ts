import { SQLiteDatabase, ResultSet } from 'react-native-sqlite-storage';
import Languages from '../data/Languages';

const addLanguages = async (db: SQLiteDatabase, languages: Languages[]) => {
    let insertQuery = `
     INSERT OR REPLACE INTO languages (language_id, language_name)
     VALUES
   `

    let dataArray : (string | string)[] = []
    
    languages.forEach((language, index) => {
        insertQuery += `(?, ?)${index < languages.length - 1 ? ',' : ''} `;
        dataArray.push(language.languageId, language.languageName);
    });
    
    try {
        return db.executeSql(insertQuery, dataArray)
    } catch (error) {
        console.error(error)
        throw Error("Failed to add language")
    }
}

const getLanguages = async (db: SQLiteDatabase): Promise<Languages[]> => {
    try {
        const languages: Languages[] = []
        const results = await db.executeSql("SELECT * FROM languages")
        results?.forEach((result : ResultSet) => {
            for (let index = 0; index < result.rows.length; index++) {
                languages.push(result.rows.item(index))
            }
        })
        return languages
    } catch (error) {
        console.error(error)
        throw Error("Failed to get languages from database")
    }
}

export { addLanguages, getLanguages };