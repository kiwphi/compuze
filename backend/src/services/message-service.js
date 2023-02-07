import { Message } from '../db/message-db.js';
import { User } from '../db/user-db.js';

export async function findMessagePageByRecipientId(recipientId, page, perPage) {
    const currentPage = page || 1;
    const offset = (currentPage - 1) * perPage;

    return await Message.fetchPageByRecipientId(recipientId, offset, perPage);
}

export async function findAllMessagesByRecipientId(recipientId) {
    return await Message.fetchAllByRecipientId(recipientId);
}

export async function findMessageById(messageId) {
    return Message.fetchById(messageId);
}

export async function createMessage({ subject, content, senderId, recipientId }) {
    const message = new Message({
        subject: subject,
        content: content,
        senderId: senderId,
        recipientId: recipientId,
    });

    return await message.save();
}

export async function removeMessageById(messageId) {
    await Message.deleteById(messageId);
}

export function isRecipient(user, message) {
    return user.id == message.recipient_id;
}

export async function markAsRead(message) {
    if (!message.is_read) {
        await Message.editField({
            messageId: message.id,
            field: 'is_read',
            value: 1,
        });
    }
}

export async function markAsUnread(message) {
    if (message.is_read) {
        await Message.editField({
            messageId: message.id,
            field: 'is_read',
            value: 0,
        });
    }
}

export async function markSentMessageTimestamp(userId) {
    await User.editField({
        userId: userId,
        field: 'last_msg_sent',
        value: Date.now(),
    });
}

export async function getElapsedSecondsSinceLastMessage(userId) {
    const user = await User.fetchById(userId);

    const nowInSeconds = Date.now() / 1000;
    const lastMsgInSeconds = user.last_msg_sent / 1000;

    return Math.floor(nowInSeconds - lastMsgInSeconds);
}

export function countUnreadMessages(messages) {
    const unreadMessages = messages.filter((message) => !message.is_read);
    return unreadMessages.length;
}
