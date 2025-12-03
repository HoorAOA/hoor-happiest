import { SQLiteDatabase, openDatabase, enablePromise } from 'react-native-sqlite-storage';

// Enable promise for SQLite
enablePromise(true);

/**
 * Connect to SQLite database
 */
export const connectToDatabase = async (): Promise<SQLiteDatabase> => {
    try {
        const db = await openDatabase({ name: 'ros_dealer.db', location: 'default' });
        console.log('Database connection opened successfully');
        return db;
    } catch (error) {
        console.error('Failed to open database', error);
        throw Error('Could not connect to database');
    }
};

/**
 * Initialize database tables
 */
export const dbInitializer = async (db: SQLiteDatabase): Promise<void> => {
    const userPreferencesQuery = `
        CREATE TABLE IF NOT EXISTS user_preferences (
            key TEXT PRIMARY KEY,
            value TEXT
        )
    `;

    const languagesQuery = `
        CREATE TABLE IF NOT EXISTS languages (
            language_id TEXT PRIMARY KEY,
            language_name TEXT
        )
    `;

    const favouriteEventsQuery = `
        CREATE TABLE IF NOT EXISTS favourites (
            event_id TEXT PRIMARY KEY,
            event_name TEXT,
            start_date TEXT,
            image_url TEXT
        )
    `;

    try {
        await db.executeSql(userPreferencesQuery);
        await db.executeSql(languagesQuery);
        await db.executeSql(favouriteEventsQuery);
        console.log('Database tables initialized successfully');
    } catch (error) {
        console.error(error);
        throw Error('Failed to create tables');
    }
};

/**
 * Get all table names from database
 */
export const getTableNames = async (db: SQLiteDatabase): Promise<string[]> => {
    try {
        const tableNames: string[] = [];
        const results = await db.executeSql(
            "SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'"
        );
        results?.forEach((result) => {
            for (let index = 0; index < result.rows.length; index++) {
                tableNames.push(result.rows.item(index).name);
            }
        });
        return tableNames;
    } catch (error) {
        console.error(error);
        throw Error('Failed to get table names from database');
    }
};

/**
 * Remove a table from database
 */
export const removeTable = async (db: SQLiteDatabase, tableName: string): Promise<void> => {
    const query = `DROP TABLE IF EXISTS ${tableName}`;
    try {
        await db.executeSql(query);
        console.log(`Table ${tableName} dropped successfully`);
    } catch (error) {
        console.error(error);
        throw Error(`Failed to drop table ${tableName}`);
    }
};
