import { db } from '../util/db-connection.js';

export class Item {
    constructor({ type, brand, model, description, location, imageSrc, price, userId }) {
        this.type = type;
        this.brand = brand;
        this.model = model;
        this.description = description;
        this.location = location;
        this.imageSrc = imageSrc;
        this.price = price;
        this.userId = userId;
        this.views = 0;
        this.createdAt = Date.now();
    }

    async save() {
        return await db('items').insert({
            type: this.type,
            brand: this.brand,
            model: this.model,
            description: this.description,
            location: this.location,
            image_src: this.imageSrc,
            price: this.price,
            views: this.views,
            user_id: this.userId,
            created_at: this.createdAt,
        });
    }

    static async replace({ itemId, type, brand, model, description, location, price }) {
        await db('items').where({ id: itemId }).update({
            type: type,
            brand: brand,
            model: model,
            description: description,
            location: location,
            price: price,
        });
    }

    static async deleteById(itemId) {
        await db('items').where({ id: itemId }).del();
    }

    static async countAll() {
        const items = await db('items');
        return items.length;
    }

    static async fetchPage({ type, search, sort, order, offset, perPage }) {
        const items = await db('items').modify((qb) => {
            if (type) {
                qb.where({ type: type });
            }
            if (search) {
                qb.where('brand', 'like', `%${search}%`);
                qb.orWhere('model', 'like', `%${search}%`);
                qb.orWhere('description', 'like', `%${search}%`);
            }
            if (sort) {
                qb.orderBy(`items.${sort}`, order);
            } else {
                qb.orderBy(`items.created_at`, 'DESC');
            }
            qb.select(
                'items.id',
                'items.type',
                'items.brand',
                'items.model',
                'items.description',
                'items.location',
                'items.image_src',
                'items.price',
                'items.views',
                'items.created_at',
                'users.username'
            );
            qb.join('users', 'users.id', 'items.user_id');
        });
        const itemsChunk = items.slice(offset, offset + perPage);
        const itemsCount = items.length;

        if (!itemsChunk.length)
            return {
                chunk: [],
                count: 0,
            };

        return {
            chunk: itemsChunk,
            count: itemsCount,
        };
    }

    static async fetchById(itemId) {
        const item = await db('items')
            .select(
                'items.id',
                'items.type',
                'items.brand',
                'items.model',
                'items.description',
                'items.location',
                'items.image_src',
                'items.price',
                'items.views',
                'items.created_at',
                'users.username',
                'users.id as user_id'
            )
            .where({ 'items.id': itemId })
            .join('users', 'users.id', 'items.user_id');
        if (!item.length) return false;
        return item[0];
    }

    static async fetchAllByUserId(userId) {
        const items = await db('items')
            .select(
                'items.id',
                'items.type',
                'items.brand',
                'items.model',
                'items.description',
                'items.location',
                'items.image_src',
                'items.price',
                'items.views',
                'items.created_at',
                'users.username'
            )
            .where({ 'items.user_id': userId })
            .join('users', 'users.id', 'items.user_id')
            .orderBy('items.created_at', 'DESC');

        if (!items.length) return [];
        return items;
    }

    static async editField({ itemId, field, value }) {
        return await db('items')
            .where({ id: itemId })
            .update({ [field]: value });
    }

    static async fetchRandomItem() {
        const item = db('items').orderByRaw('RAND()').limit(1);
        if (!item.length) return false;
        return item[0];
    }
}
