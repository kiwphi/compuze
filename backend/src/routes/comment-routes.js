import express from 'express';
import { deleteComment, getComment, postComment } from '../controllers/comment-controller.js';
import { checkAuth } from '../middleware/handlers/auth-handler.js';
import { validateComment } from '../middleware/validators/comment-validator.js';

export const commentRoutes = express.Router();

commentRoutes.get('/:commentId', getComment);
commentRoutes.post('/', checkAuth, validateComment, postComment);
commentRoutes.delete('/:commentId', checkAuth, deleteComment);
