import {
    createItem,
    replaceItem,
    isAuthorOfItem,
    incrementItemViews,
    findItems,
    findItemById,
    findItemsByUserId,
    removeItemById,
} from '../services/item-service.js';
import { ITEM_TYPES } from '../util/constants.js';

const ITEMS_PER_PAGE = 10;
const ITEM_LIMIT_PER_USER = 15;

// GET /items
export async function getItems(req, res, next) {
    try {
        const items = await findItems({
            type: req.query.type,
            search: req.query.search,
            sort: req.query.sort,
            order: req.query.order,
            page: req.query.page,
            perPage: ITEMS_PER_PAGE,
        });

        res.status(200).json({
            success: true,
            message: 'Fetched items successfully',
            data: {
                items: items.itemChunk,
                count: items.itemCount,
                itemTypes: ITEM_TYPES,
                perPage: ITEMS_PER_PAGE,
            },
        });
    } catch (err) {
        next(err);
    }
}

// GET /users/[userId]/items
export async function getUserItems(req, res, next) {
    try {
        const items = await findItemsByUserId(req.params.userId);
        res.status(200).json({
            success: true,
            message: 'Fetched user items successfully',
            data: {
                items: items,
            },
        });
    } catch (err) {
        next(err);
    }
}

// PATCH /items/[itemId]/views
export async function patchViews(req, res, next) {
    try {
        const item = await findItemById(req.params.itemId);

        if (!item) {
            return next();
        }

        await incrementItemViews(req.params.itemId);
        return res.status(200).json({
            success: true,
            message: `Incremented views for itemId #${req.params.itemId} by 1.`,
            data: {
                item: item,
            },
        });
    } catch (err) {
        next(err);
    }
}

// POST /items
export async function postItem(req, res, next) {
    try {
        if (req.errors.length) {
            return res.status(422).json({
                success: false,
                message: 'Failed to post item',
                errors: req.errors,
            });
        }

        const userItems = await findItemsByUserId(req.user.id);

        if (userItems.length >= ITEM_LIMIT_PER_USER) {
            return res.status(403).json({
                success: false,
                message: 'Failed to post item',
                errors: ['You have reached your maximum item posting limit'],
            });
        }

        const itemId = await createItem({
            type: req.body.type,
            brand: req.body.brand,
            model: req.body.model,
            description: req.body.description,
            location: req.body.location,
            imageSrc: req.imageSrc ? req.imageSrc : 'default',
            price: req.body.price,
            userId: req.user.id,
        });

        const item = await findItemById(itemId);

        res.status(201).json({
            success: true,
            message: 'Item created',
            data: {
                item: item,
            },
        });
    } catch (err) {
        next(err);
    }
}

// GET /items/[itemId]
export async function getItem(req, res, next) {
    try {
        const item = await findItemById(req.params.itemId);

        if (!item) {
            return next();
        }

        return res.status(200).json({
            success: true,
            message: 'Item found',
            data: {
                item: item,
            },
        });
    } catch (err) {
        next(err);
    }
}

// PUT /items/[itemId]
export async function putItem(req, res, next) {
    try {
        const item = await findItemById(req.params.itemId);

        if (!item) {
            return next();
        }

        if (!isAuthorOfItem(req.user, item)) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to modify user',
            });
        }
        if (req.errors.length) {
            return res.status(422).json({
                success: false,
                message: 'Failed to edit item',
                errors: req.errors,
            });
        }

        await replaceItem({
            itemId: req.params.itemId,
            type: req.body.type,
            brand: req.body.brand,
            model: req.body.model,
            description: req.body.description,
            location: req.body.location,
            imageSrc: req.imageSrc,
            price: req.body.price,
        });

        const updatedItem = await findItemById(req.params.itemId);

        res.status(200).json({
            success: true,
            message: 'Item updated',
            data: {
                item: updatedItem,
            },
        });
    } catch (err) {
        next(err);
    }
}

// DELETE /items/[itemId]
export async function deleteItem(req, res, next) {
    try {
        const item = await findItemById(req.params.itemId);

        if (!item) {
            return next();
        }

        if (!isAuthorOfItem(req.user, item)) {
            // trying to delete another user's item
            return res.status(403).json({
                success: false,
                message: 'Not authorized to delete item',
            });
        }

        await removeItemById(req.params.itemId);
        return res.status(200).json({
            success: true,
            message: `Deleted item #${req.params.itemId}`,
        });
    } catch (err) {
        next(err);
    }
}
