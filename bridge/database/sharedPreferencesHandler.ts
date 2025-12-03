
import { SQLiteDatabase, ResultSet } from 'react-native-sqlite-storage';
import { UserPreference } from '../models';

/**
 * Add or update user preferences in database
 */
export const addSharedPreferencesHandler = async (
    db: SQLiteDatabase,
    userPreferences: UserPreference[]
): Promise<void> => {
    let insertQuery = `
        INSERT OR REPLACE INTO user_preferences (key, value)
        VALUES
    `;

    const dataArray: (string | string)[] = [];

    userPreferences.forEach((userPreference, index) => {
        insertQuery += `(?, ?)${index < userPreferences.length - 1 ? ',' : ''} `;
        dataArray.push(userPreference.key, userPreference.value);
    });

    try {
        await db.executeSql(insertQuery, dataArray);
        console.log('User preferences added successfully');
    } catch (error) {
        console.error(error);
        throw Error('Failed to add shared preferences');
    }
};

/**
 * Get all user preferences from database
 */
export const getSharedPreferencesHandler = async (
    db: SQLiteDatabase
): Promise<UserPreference[]> => {
    try {
        const userPreferences: UserPreference[] = [];
        const results = await db.executeSql('SELECT * FROM user_preferences');
        results?.forEach((result: ResultSet) => {
            for (let index = 0; index < result.rows.length; index++) {
                userPreferences.push(result.rows.item(index));
            }
        });
        return userPreferences;
    } catch (error) {
        console.error(error);
        throw Error('Failed to get shared preferences');
    }
};

/**
 * Get a single user preference by key
 */
export const getSingleUserPreference = async (
    db: SQLiteDatabase,
    keyName: string
): Promise<string | null> => {
    const query = `SELECT * FROM user_preferences WHERE key = '${keyName}'`;
    try {
        const results = await db.executeSql(query);
        if (results[0]?.rows?.length) {
            return results[0].rows.item(0).value;
        }
        return '';
    } catch (error) {
        console.error(error);
        throw Error('Failed to get reference from database');
    }
};
