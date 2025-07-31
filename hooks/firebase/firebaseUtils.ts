
import { firebase } from '@react-native-firebase/database';

const db = firebase
  .app()
  .database('https://hoor-a03f7-default-rtdb.firebaseio.com/');


export async function fetchConfigurations(): Promise<{
  languages: Record<string, string>;
}>  {
  try {
    const snap = await db.ref('/').once('value');
    const data = snap.val();

    const languages = data?.languages ?? {};

    return { languages };
  } catch (error) {
    return { languages: {} };
  }
}