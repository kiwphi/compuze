import { Item } from '../db/item-db.js';

export async function findItems({ type, search, sort, order, page, perPage }) {
    const currentPage = page || 1;
    const offset = (currentPage - 1) * perPage;

    return await Item.fetchPage({
        type: type,
        search: search,
        sort: sort,
        order: order,
        offset: offset,
        perPage: perPage,
    });
}

export async function findItemsByUserId(userId) {
    return Item.fetchAllByUserId(userId);
}

export async function findItemById(itemId) {
    return Item.fetchById(itemId);
}

export async function createItem({ type, brand, model, description, location, imageSrc, price, userId }) {
    const item = new Item({
        type: type,
        brand: brand,
        model: model,
        description: description,
        location: location,
        imageSrc: imageSrc,
        price: price,
        userId: userId,
    });

    return await item.save();
}

export async function replaceItem({ itemId, type, brand, model, description, location, imageSrc, price }) {
    await Item.replace({
        itemId: itemId,
        type: type,
        brand: brand,
        model: model,
        location: location,
        description: description,
        price: price,
    });

    if (imageSrc) {
        await Item.editField({
            itemId: itemId,
            field: 'image_src',
            value: imageSrc,
        });
    }
}

export async function removeItemById(itemId) {
    await Item.deleteById(itemId);
}

export function isAuthorOfItem(user, item) {
    return user.id == item.user_id;
}

export async function incrementItemViews(itemId) {
    const fetchedItem = await Item.fetchById(itemId);
    const updatedViews = fetchedItem.views + 1;

    return await Item.editField({
        itemId: itemId,
        field: 'views',
        value: updatedViews,
    });
}
