// Main imports
import express from 'express';
import fs from 'fs';
import dotenv from 'dotenv/config';
import https from 'https';
import cookieParser from 'cookie-parser';

// Custom imports
import { allowHeaders } from './middleware/handlers/headers-handler.js';
import { addErrorsArray, error404, errorInternal } from './middleware/handlers/error-handler.js';
import { itemRoutes } from './routes/item-routes.js';
import { commentRoutes } from './routes/comment-routes.js';
import { messageRoutes } from './routes/message-routes.js';
import { userRoutes } from './routes/user-routes.js';
import { authRoutes } from './routes/auth-routes.js';

// Path imports
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

// Express
const app = express();

// Body & cookie parsers
app.use(express.json());
app.use(cookieParser());

// Middleware
app.use(allowHeaders);
app.use('*', addErrorsArray);

// Static
const __dirname = dirname(fileURLToPath(import.meta.url));
app.use('/public', express.static(path.join(__dirname, '..', 'public')));

// Routes
app.use('/items', itemRoutes);
app.use('/comments', commentRoutes);
app.use('/messages', messageRoutes);
app.use('/users', userRoutes);
app.use('/auth', authRoutes);

// Middleware
app.use(error404);
app.use(errorInternal);

// LISTEN-HTTP
app.listen(process.env.APP_PORT, () => {
    console.log(`Listening over HTTP on port ${process.env.APP_PORT}`);
});

// LISTEN-HTTPS
try {
    const privateKey = fs.readFileSync('/etc/letsencrypt/live/DOMAIN.com/privkey.pem', 'utf8');
    const certificate = fs.readFileSync('/etc/letsencrypt/live/DOMAIN.com/cert.pem', 'utf8');
    const ca = fs.readFileSync('/etc/letsencrypt/live/DOMAIN.com/chain.pem', 'utf8');

    const credentials = {
        key: privateKey,
        cert: certificate,
        ca: ca,
    };

    https.createServer(credentials, app).listen(process.env.HTTPS_PORT, () => {
        console.log(`Listening over HTTPS on port ${process.env.HTTPS_PORT}`);
    });
} catch (err) {
    console.log('Not listening over HTTPS');
}
