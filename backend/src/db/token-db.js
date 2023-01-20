import { db } from '../util/db-connection.js';

export class Token {
    static async save(userId, token) {
        await db('tokens').insert({
            user_id: userId,
            token: token,
        });
    }

    static async deleteByUserId(userId) {
        await db('tokens').where({ user_id: userId }).del();
    }

    static async fetchByUserId(userId) {
        const token = await db('tokens').where({ user_id: userId });

        if (!token.length) return false;
        return token[0];
    }
}
