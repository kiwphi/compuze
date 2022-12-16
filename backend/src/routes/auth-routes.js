import express from 'express';
import { forgot, login, logout, reset, signUp, whoami } from '../controllers/auth-controller.js';
import { checkAuth } from '../middleware/handlers/auth-handler.js';
import {
    validateLogin,
    validateForgot,
    validateSignup,
    validateReset,
} from '../middleware/validators/user-validator.js';

export const authRoutes = express.Router();

authRoutes.post('/login', validateLogin, login);
authRoutes.post('/logout', checkAuth, logout);
authRoutes.post('/signup', validateSignup, signUp);

// whoami
authRoutes.get('/whoami', checkAuth, whoami);

// password reset
authRoutes.post('/forgot', validateForgot, forgot);
authRoutes.post('/reset', validateReset, reset);
