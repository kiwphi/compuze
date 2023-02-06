import {
    countUnreadMessages,
    createMessage,
    findMessageById,
    findMessagesByRecipientId,
    isRecipient,
    markAsRead,
    markAsUnread,
    removeMessageById,
} from '../services/message-service.js';
import { findUserByUsername } from '../services/user-service.js';

const MESSAGES_PER_PAGE = 5;

// GET /messages
export async function getMessages(req, res, next) {
    try {
        const messages = await findMessagesByRecipientId(req.user, req.query.page, MESSAGES_PER_PAGE);
        const unreadCount = countUnreadMessages(messages);

        return res.status(200).json({
            success: true,
            message: 'Messages fetched successfully',
            data: {
                messages: messages,
                count: 15, // change
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

        const recipient = await findUserByUsername(req.body.recipientUsername);

        const messageId = await createMessage({
            subject: req.body.subject,
            content: req.body.content,
            senderId: req.user.id,
            recipientId: recipient.id,
        });

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
