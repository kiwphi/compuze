import jwt from 'jsonwebtoken';
import { findUserById } from '../../services/user-service.js';

export async function checkAuth(req, res, next) {
    const { token } = req.cookies;

    if (!token)
        return res.status(401).json({
            success: false,
            message: 'Authorization required',
        });

    try {
        const decoded = jwt.verify(token, process.env.SECRET);
        const user = await findUserById(decoded.userId);
        req.user = user;
    } catch (err) {
        return res.status(401).json({
            success: false,
            message: 'Invalid token',
        });
    }
    next();
}
