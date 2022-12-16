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

    static async fetchAllByUserId(userId) {
        const favorites = await db('favorites')
            .select(
                'items.id',
                'items.created_at',
                'items.type',
                'items.brand',
                'items.image_src',
                'items.price',
                'items.model',
                'items.description',
                'items.views',
                'users.username'
            )
            .where({ 'favorites.user_id': userId })
            .join('users', 'users.id', 'favorites.user_id')
            .join('items', 'items.id', 'favorites.item_id');

        if (!favorites.length) return [];
        return favorites;
    }
}
