import knex from 'knex';
import { initDatabase } from './db-helpers.js';
import { populateDatabase } from './db-populator.js';

export const db = knex({
    client: 'mysql2',
    connection: {
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
    },
});

await initDatabase();

if (parseInt(process.env.FAKE_DATA)) {
    await populateDatabase();
}
