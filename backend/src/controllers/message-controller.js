import {
    countUnreadMessages,
    createMessage,
    findAllMessagesByRecipientId,
    findMessageById,
    findMessagePageByRecipientId,
    getElapsedSecondsSinceLastMessage,
    isRecipient,
    markAsRead,
    markAsUnread,
    markSentMessageTimestamp,
    removeMessageById,
} from '../services/message-service.js';
import { findUserByUsername } from '../services/user-service.js';

const MESSAGES_PER_PAGE = 5;
const SENDING_INTERVAL = 15; // how many seconds to wait between each message sent

// GET /messages
export async function getMessages(req, res, next) {
    try {
        const messages = await findMessagePageByRecipientId(req.user.id, req.query.page, MESSAGES_PER_PAGE);
        const allMessages = await findAllMessagesByRecipientId(req.user.id);
        const unreadCount = countUnreadMessages(allMessages);

        return res.status(200).json({
            success: true,
            message: 'Messages fetched successfully',
            data: {
                messages: messages.messageChunk,
                count: messages.messageCount,
                unreadCount: unreadCount,
                perPage: MESSAGES_PER_PAGE,
            },
        });
    } catch (err) {
        next(err);
    }
}

// GET /messages/[messageId]
export async function getMessage(req, res, next) {
    try {
        const message = await findMessageById(req.params.messageId);

        if (!message) {
            return next();
        }

        if (!isRecipient(req.user, message)) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to read message',
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Fetched message successfully',
            data: {
                message: message,
            },
        });
    } catch (err) {
        next(err);
    }
}

// POST /messages
export async function postMessage(req, res, next) {
    try {
        if (req.errors.length) {
            return res.status(422).json({
                success: false,
                message: 'Unable to send message',
                errors: req.errors,
            });
        }

        if ((await getElapsedSecondsSinceLastMessage(req.user.id)) < SENDING_INTERVAL) {
            return res.status(422).json({
                success: false,
                message: 'Unable to send message',
                errors: ['Please allow some time before sending another message'],
            });
        }
        const recipient = await findUserByUsername(req.body.recipientUsername);

        const messageId = await createMessage({
            subject: req.body.subject,
            content: req.body.content,
            senderId: req.user.id,
            recipientId: recipient.id,
        });

        markSentMessageTimestamp(req.user.id);

        const message = await findMessageById(messageId);

        return res.status(201).json({
            success: true,
            message: 'Message sent',
            data: {
                message: message,
            },
        });
    } catch (err) {
        next(err);
    }
}

// PATCH /message/[messageId]/read
export async function markMessageAsRead(req, res, next) {
    try {
        const message = await findMessageById(req.params.messageId);

        if (!message) {
            return next();
        }

        if (!isRecipient(req.user, message)) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to modify message',
            });
        }

        await markAsRead(message);
        return res.status(200).json({
            success: true,
            message: `Message #${req.params.messageId} marked as read`,
            data: {
                message: message,
            },
        });
    } catch (err) {
        next(err);
    }
}

// DELETE /messages/[messageId]/read
export async function markMessageAsUnread(req, res, next) {
    try {
        const message = await findMessageById(req.params.messageId);

        if (!message) {
            return next();
        }

        if (!isRecipient(req.user, message)) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to modify message',
            });
        }

        await markAsUnread(message);
        return res.status(200).json({
            success: true,
            message: `Message #${req.params.messageId} marked as unread`,
            data: {
                message: message,
            },
        });
    } catch (err) {
        next(err);
    }
}

// DELETE /messages/[messageId]
export async function deleteMessage(req, res, next) {
    try {
        const message = await findMessageById(req.params.messageId);

        if (!message) {
            return next();
        }

        if (!isRecipient(req.user, message)) {
            return res.status(403).json({ success: false, message: 'Not authorized to delete message' });
        }

        await removeMessageById(req.params.messageId);
        return res.status(200).json({ success: true, message: `Message #${req.params.messageId} deleted` });
    } catch (err) {
        next(err);
    }
}
