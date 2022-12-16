// Main imports
import express from 'express';
import dotenv from 'dotenv/config';
import cookieParser from 'cookie-parser';

// HTTPS imports
// import https from 'https';

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

// HTTPS Certs
// const privateKey = fs.readFileSync('/etc/letsencrypt/live/<domain>/privkey.pem', 'utf8');
// const certificate = fs.readFileSync('/etc/letsencrypt/live/<domain>/cert.pem', 'utf8');
// const ca = fs.readFileSync('/etc/letsencrypt/live/<domain>/chain.pem', 'utf8');

// const credentials = {
// 	key: privateKey,
// 	cert: certificate,
// 	ca: ca
// };

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
    console.log(`Listening on port ${process.env.APP_PORT}`);
});

// Listen-HTTPS
// https.createServer(credentials, app).listen(process.env.APP_PORT, () => {
//     console.log(`Listening on port ${process.env.APP_PORT}`);
// });
