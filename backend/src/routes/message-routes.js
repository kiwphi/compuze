import express from 'express';
import {
    deleteMessage,
    getMessage,
    getMessages,
    markMessageAsRead,
    markMessageAsUnread,
    postMessage,
} from '../controllers/message-controller.js';
import { checkAuth } from '../middleware/handlers/auth-handler.js';
import { trimBody } from '../middleware/handlers/trimmer.js';
import { validateMessage } from '../middleware/validators/message-validator.js';

export const messageRoutes = express.Router();

messageRoutes.get('/', checkAuth, getMessages);
messageRoutes.get('/:messageId', checkAuth, getMessage);

messageRoutes.post('/', checkAuth, trimBody, validateMessage, postMessage);
messageRoutes.delete('/:messageId', checkAuth, deleteMessage);

messageRoutes.patch('/:messageId/read', checkAuth, markMessageAsRead);
messageRoutes.delete('/:messageId/read', checkAuth, markMessageAsUnread);
