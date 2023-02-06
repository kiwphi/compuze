import { db } from '../util/db-connection.js';

export class Comment {
    constructor({ content, userId, itemId }) {
        this.content = content;
        this.userId = userId;
        this.itemId = itemId;
        this.createdAt = Date.now();
    }

    async save() {
        return await db('comments').insert({
            content: this.content,
            user_id: this.userId,
            item_id: this.itemId,
            created_at: this.createdAt,
        });
    }

    static async deleteById(commentId) {
        await db('comments').where({ id: commentId }).del();
    }

    static async fetchByItemId(itemId) {
        const comments = await db('comments')
            .select(
                'comments.id',
                'comments.content',
                'comments.created_at',
                'comments.user_id',
                'comments.item_id',
                'users.username'
            )
            .where({ 'comments.item_id': itemId })
            .join('users', 'users.id', 'comments.user_id');

        if (!comments.length) return [];
        return comments;
    }

    static async fetchById(commentId) {
        const comments = await db('comments')
            .select(
                'comments.id',
                'comments.content',
                'comments.created_at',
                'comments.user_id',
                'comments.item_id',
                'users.username'
            )
            .where({ 'comments.id': commentId })
            .join('users', 'users.id', 'comments.user_id');

        if (!comments.length) return false;
        return comments[0];
    }
}
