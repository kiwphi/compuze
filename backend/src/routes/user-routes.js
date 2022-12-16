import express from 'express';
import { getUserFavorites } from '../controllers/favorite-controller.js';
import { getUserItems } from '../controllers/item-controller.js';
import { getUser, patchUser, getUsers } from '../controllers/user-controller.js';
import { checkAuth } from '../middleware/handlers/auth-handler.js';
import { validateEdit } from '../middleware/validators/user-validator.js';

export const userRoutes = express.Router();

// users
userRoutes.get('/', getUsers);
userRoutes.get('/:userId', getUser);
userRoutes.patch('/:userId', checkAuth, validateEdit, patchUser);

// items
userRoutes.get('/:userId/items', getUserItems);

// favorites
userRoutes.get('/:userId/favorites', getUserFavorites);
