import { createUser } from '../services/auth-service.js';
import { createItem } from '../services/item-service.js';
import { db } from './db-connection.js';
import { FAKE_ITEMS, FAKE_USERS } from './fake-data.js';

export async function populateDatabase() {
    const items = await db('items');

    if (!items.length) {
        for (const user of FAKE_USERS) {
            await createUser(user);
        }

        for (const item of FAKE_ITEMS) {
            await createItem(item);
        }
    }
}
