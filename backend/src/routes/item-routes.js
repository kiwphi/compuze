import express from 'express';
import { getComments } from '../controllers/comment-controller.js';
import { deleteFavorite, getFavorite, postFavorite } from '../controllers/favorite-controller.js';
import { deleteItem, putItem, getItem, getItems, postItem, patchViews } from '../controllers/item-controller.js';
import { checkAuth } from '../middleware/handlers/auth-handler.js';
import { checkImage } from '../middleware/handlers/image-parser.js';
import { resizeImage } from '../middleware/handlers/image-processor.js';
import { trimBody } from '../middleware/handlers/trimmer.js';
import { validateItem } from '../middleware/validators/item-validator.js';

export const itemRoutes = express.Router();

itemRoutes.get('/', getItems);
itemRoutes.get('/:itemId', getItem);

itemRoutes.post('/', checkAuth, checkImage, resizeImage, trimBody, validateItem, postItem);
itemRoutes.put('/:itemId', checkAuth, checkImage, resizeImage, trimBody, validateItem, putItem);

itemRoutes.patch('/:itemId/views', patchViews);
itemRoutes.delete('/:itemId', checkAuth, deleteItem);

// comments
itemRoutes.get('/:itemId/comments', getComments);

// favorites
itemRoutes.get('/:itemId/favorites', checkAuth, getFavorite);
itemRoutes.post('/:itemId/favorites', checkAuth, postFavorite);
itemRoutes.delete('/:itemId/favorites', checkAuth, deleteFavorite);
