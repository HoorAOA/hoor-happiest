
import { SQLiteDatabase, ResultSet } from 'react-native-sqlite-storage';
import { Languages } from '../models';

/**
 * Add or update languages in database
 */
export const addLanguages = async (db: SQLiteDatabase, languages: Languages[]): Promise<void> => {
    let insertQuery = `
        INSERT OR REPLACE INTO languages (language_id, language_name)
        VALUES
    `;

    const dataArray: (string | string)[] = [];

    languages.forEach((language, index) => {
        insertQuery += `(?, ?)${index < languages.length - 1 ? ',' : ''} `;
        dataArray.push(language.languageId, language.languageName);
    });

    try {
        await db.executeSql(insertQuery, dataArray);
        console.log('Languages added successfully');
    } catch (error) {
        console.error(error);
        throw Error('Failed to add language');
    }
};

/**
 * Get all languages from database
 */
export const getLanguages = async (db: SQLiteDatabase): Promise<Languages[]> => {
    try {
        const languages: Languages[] = [];
        const results = await db.executeSql('SELECT * FROM languages');
        results?.forEach((result: ResultSet) => {
            for (let index = 0; index < result.rows.length; index++) {
                languages.push(result.rows.item(index));
            }
        });
        return languages;
    } catch (error) {
        console.error(error);
        throw Error('Failed to get languages from database');
    }
};
