import { SQLiteDatabase, ResultSet } from 'react-native-sqlite-storage';
import FavouriteEvents from '../data/FavouriteEvents';

const addFavouriteEvents = async (db: SQLiteDatabase, favourites: FavouriteEvents[]) => {
    let insertQuery = `
     INSERT OR REPLACE INTO favourites (event_id, event_name, start_date, image_url)
     VALUES
   `

    let dataArray : (string | string | string | string)[] = []
    
    favourites.forEach((favourite, index) => {
        insertQuery += `(?, ?, ?, ?)${index < favourites.length - 1 ? ',' : ''} `;
        dataArray.push(favourite.id, favourite.name, favourite.startDate, favourite.imagesUrl);
    });
    
    try {
        return db.executeSql(insertQuery, dataArray)
    } catch (error) {
        console.error(error)
        throw Error("Failed to add favourites")
    }
}

const getFavouriteEvents = async (db: SQLiteDatabase): Promise<FavouriteEvents[]> => {
    try {
        const favourites: FavouriteEvents[] = []
        const results = await db.executeSql("SELECT * FROM favourites")
        results?.forEach((result: ResultSet) => {
      for (let index = 0; index < result.rows.length; index++) {
        const row = result.rows.item(index);
        favourites.push(
          new FavouriteEvents(
            row.event_id,
            row.event_name,
            row.start_date,
            row.image_url
          )
        );
      }
    });

    return favourites;
    } catch (error) {
        console.error(error)
        throw Error("Failed to get favourites from database")
    }
}

const removeFavoriteEvent = async (db: SQLiteDatabase, eventId: string) => {
  try {
    await db.executeSql("DELETE FROM favourites WHERE event_id = ?", [eventId]);
  } catch (error) {
    console.error("Failed to remove favorite:", error);
    throw Error("Failed to remove favorite from database");
  }
};

export { addFavouriteEvents, getFavouriteEvents, removeFavoriteEvent };