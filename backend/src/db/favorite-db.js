import { db } from '../util/db-connection.js';

export class Favorite {
    static async save(userId, itemId) {
        return await db('favorites').insert({
            user_id: userId,
            item_id: itemId,
        });
    }

    static async delete(userId, itemId) {
        await db('favorites').where({ user_id: userId }).andWhere({ item_id: itemId }).del();
    }

    static async fetchOneById(userId, itemId) {
        const favorite = await db('favorites')
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
            .andWhere({ 'favorites.item_id': itemId })
            .join('users', 'users.id', 'favorites.user_id')
            .join('items', 'items.id', 'favorites.item_id');

        if (!favorite.length) return false;
        return favorite[0];
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
            .join('items', 'items.id', 'favorites.item_id')
            .join('users', 'users.id', 'items.user_id')
            .orderBy('items.created_at', 'DESC');

        if (!favorites.length) return [];
        return favorites;
    }
}
