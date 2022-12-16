import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../db/user-db.js';
import crypto from 'crypto';
import { Token } from '../db/token-db.js';

export async function createUser({ username, password, email, phone }) {
    const hashedPass = await bcrypt.hash(password, 12);
    const user = new User({
        username: username,
        password: hashedPass,
        email: email,
        phone: phone,
    });

    user.save();
}

export async function comparePasswords(password1, password2) {
    return bcrypt.compare(password1, password2);
}

export async function createAuthToken(user) {
    return jwt.sign(
        {
            userId: user.id,
            username: user.username,
        },
        process.env.SECRET,
        { expiresIn: '2w' }
    );
}

export async function removeUserTokens(userId) {
    Token.deleteByUserId(userId);
}

export async function createResetTokens() {
    const plainToken = createRandomHash();
    const hashedToken = await bcrypt.hash(plainToken, 12);

    return { plainToken, hashedToken };
}

export function createRandomHash() {
    return crypto.randomBytes(32).toString('hex');
}

export async function verifyToken(userId, plainToken) {
    const fetchedToken = await Token.fetchByUserId(userId);
    if (!fetchedToken) {
        return false;
    }
    const hashedToken = fetchedToken.token;
    return await bcrypt.compare(plainToken, hashedToken);
}

export async function storeHashedToken(userId, hashedToken) {
    Token.save(userId, hashedToken);
}
