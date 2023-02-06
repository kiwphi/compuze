import { db } from '../util/db-connection.js';

export class Message {
    constructor({ subject, content, senderId, recipientId }) {
        this.subject = subject;
        this.content = content;
        this.senderId = senderId;
        this.recipientId = recipientId;
        this.isRead = 0;
        this.createdAt = Date.now();
    }

    async save() {
        return await db('messages').insert({
            subject: this.subject,
            content: this.content,
            sender_id: this.senderId,
            recipient_id: this.recipientId,
            is_read: this.isRead,
            created_at: this.createdAt,
        });
    }

    static async deleteById(messageId) {
        await db('messages').where({ id: messageId }).del();
    }

    static async editField({ messageId, field, value }) {
        return await db('messages')
            .where({ id: messageId })
            .update({ [field]: value });
    }

    static async fetchById(messageId) {
        const messages = await db('messages')
            .select(
                'messages.id',
                'messages.subject',
                'messages.content',
                'messages.is_read',
                'messages.created_at',
                'stable.username AS sender',
                'rtable.username AS recipient',
                'rtable.id as recipient_id',
                'stable.id AS sender_id'
            )
            .where({ 'messages.id': messageId })
            .join('users as stable', 'stable.id', 'messages.sender_id')
            .join('users as rtable', 'rtable.id', 'messages.recipient_id');

        if (!messages.length) return false;
        return messages[0];
    }

    static async fetchPageByRecipientId(recipientId, offset, perPage) {
        const messages = await db('messages')
            .select(
                'messages.id',
                'messages.subject',
                'messages.content',
                'messages.is_read',
                'messages.created_at',
                'stable.username AS sender',
                'rtable.username AS recipient',
                'rtable.id as recipient_id',
                'stable.id AS sender_id',
                // count number of rows before offset & limit
                db.raw('count(*) OVER() AS count')
            )
            .offset(offset)
            .limit(perPage)
            .where({ recipient_id: recipientId })
            .orderBy('messages.created_at', 'DESC')
            .join('users as stable', 'stable.id', 'messages.sender_id')
            .join('users as rtable', 'rtable.id', 'messages.recipient_id');

        if (!messages.length) return [];
        return messages;
    }
}
