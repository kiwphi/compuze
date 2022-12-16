import { Favorite } from '../db/favorite-db.js';

export async function addItemToFavorites(userId, itemId) {
    return await Favorite.save(userId, itemId);
}

export async function removeItemFromFavorites(userId, itemId) {
    await Favorite.delete(userId, itemId);
}

export async function findFavorite(userId, itemId) {
    return await Favorite.fetchOneById(userId, itemId);
}

export async function findFavorites(userId) {
    return await Favorite.fetchAllByUserId(userId);
}
