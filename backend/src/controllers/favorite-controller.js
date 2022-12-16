import {
    addItemToFavorites,
    findFavorite,
    findFavorites,
    removeItemFromFavorites,
} from '../services/favorite-service.js';
import { findItemById } from '../services/item-service.js';
import { findUserById } from '../services/user-service.js';

// GET /[userId]/favorites
export async function getUserFavorites(req, res, next) {
    try {
        const user = findUserById(req.params.userId);

        if (!user) {
            return next();
        }

        const favorites = await findFavorites(req.params.userId);

        res.status(200).json({
            success: true,
            message: 'Fetching favorites successful',
            data: {
                favorites: favorites,
            },
        });
    } catch (err) {
        next(err);
    }
}

// POST /[itemId]/favorites
export async function postFavorite(req, res, next) {
    try {
        const item = await findItemById(req.params.itemId);

        if (!item) {
            return next();
        }

        if (await findFavorite(req.user.id, req.params.itemId)) {
            return res.status(400).json({ success: false, message: 'Item already in favorites' });
        }

        await addItemToFavorites(req.user.id, req.params.itemId);
        const favorite = await findFavorite(req.user.id, req.params.itemId);

        return res.status(200).json({
            success: true,
            message: 'Item added to favorites.',
            data: {
                favorite: favorite,
            },
        });
    } catch (err) {
        next(err);
    }
}

// DELETE /[itemId]/favorites
export async function deleteFavorite(req, res, next) {
    try {
        const item = await findItemById(req.params.itemId);

        if (!item) {
            return next();
        }

        if (!(await findFavorite(req.user.id, req.params.itemId))) {
            return res.status(400).json({ success: false, message: 'Item not in favorites' });
        }

        await removeItemFromFavorites(req.user.id, req.params.itemId);

        return res.status(200).json({ success: true, message: `Item #${req.params.itemId} removed from favorites.` });
    } catch (err) {
        next(err);
    }
}

// GET /[itemId]/favorites
export async function getFavorite(req, res, next) {
    try {
        const item = await findItemById(req.params.itemId);

        if (!item) {
            return next();
        }

        const favorite = await findFavorite(req.user.id, req.params.itemId);

        if (!favorite) {
            return res.status(400).json({ success: false, message: 'Item not in favorites' });
        }

        return res.status(200).json({
            success: true,
            message: 'Favorite found',
            data: {
                favorite: favorite,
            },
        });
    } catch (err) {
        next(err);
    }
}
