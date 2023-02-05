import { createUser } from '../services/auth-service.js';
import { createItem } from '../services/item-service.js';
import { db } from './db-connection.js';
import { FAKE_ITEMS, FAKE_USER } from './fake-data.js';

export async function populateDatabase() {
    const items = await db('items');

    if (!items.length) {
        // insert fake user into database
        await createUser(FAKE_USER);

        // insert fake items into database
        FAKE_ITEMS.forEach(async (item) => {
            createItem(item);
        });
    }
}
