
import { SQLiteDatabase, ResultSet } from 'react-native-sqlite-storage';
import { FavouriteEvents } from '../models';

/**
 * Add or update favourite events in database
 */
export const addFavouriteEvents = async (
    db: SQLiteDatabase,
    favourites: FavouriteEvents[]
): Promise<void> => {
    let insertQuery = `
        INSERT OR REPLACE INTO favourites (event_id, event_name, start_date, image_url)
        VALUES
    `;

    const dataArray: (string | string | string | string)[] = [];

    favourites.forEach((favourite, index) => {
        insertQuery += `(?, ?, ?, ?)${index < favourites.length - 1 ? ',' : ''} `;
        dataArray.push(favourite.id, favourite.name, favourite.startDate, favourite.imagesUrl);
    });

    try {
        await db.executeSql(insertQuery, dataArray);
        console.log('Favourite events added successfully');
    } catch (error) {
        console.error(error);
        throw Error('Failed to add favourites');
    }
};

/**
 * Get all favourite events from database
 */
export const getFavouriteEvents = async (db: SQLiteDatabase): Promise<FavouriteEvents[]> => {
    try {
        const favourites: FavouriteEvents[] = [];
        const results = await db.executeSql('SELECT * FROM favourites');
        results?.forEach((result: ResultSet) => {
            for (let index = 0; index < result.rows.length; index++) {
                const row = result.rows.item(index);
                favourites.push(
                    new FavouriteEvents(row.event_id, row.event_name, row.start_date, row.image_url)
                );
            }
        });

        return favourites;
    } catch (error) {
        console.error(error);
        throw Error('Failed to get favourites from database');
    }
};

/**
 * Remove a specific favourite event by ID
 */
export const removeFavoriteEvent = async (db: SQLiteDatabase, eventId: string): Promise<void> => {
    try {
        await db.executeSql('DELETE FROM favourites WHERE event_id = ?', [eventId]);
        console.log(`Favourite event ${eventId} removed successfully`);
    } catch (error) {
        console.error('Failed to remove favorite:', error);
        throw Error('Failed to remove favorite from database');
    }
};
