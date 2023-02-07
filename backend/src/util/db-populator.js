import { createUser } from '../services/auth-service.js';
import { createItem } from '../services/item-service.js';
import { db } from './db-connection.js';
import { FAKE_ITEMS, FAKE_USERS } from './fake-data.js';

export async function populateDatabase() {
    const items = await db('items');

    if (!items.length) {
        await createUsers();
        await createItems();
    }
}

async function createUsers() {
    FAKE_USERS.forEach(async (user) => {
        await createUser(user);
    });
}
async function createItems() {
    FAKE_ITEMS.forEach(async (item) => {
        await createItem(item);
    });
}
