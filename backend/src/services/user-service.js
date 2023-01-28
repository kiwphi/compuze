import { User } from '../db/user-db.js';
import bcrypt from 'bcrypt';

export async function findUsers() {
    return await User.fetchAll();
}

export async function findUserByUsername(username) {
    return await User.fetchByUsername(username);
}

export async function findUserByEmail(email) {
    return await User.fetchByEmail(email);
}

export async function findUserById(userId) {
    return await User.fetchById(userId);
}

export async function modifyUser({ userId, phone, email, privacy, password }) {
    if (phone !== undefined) {
        await User.editField({
            userId: userId,
            field: 'phone',
            value: phone,
        });
    }

    if (email !== undefined) {
        await User.editField({
            userId: userId,
            field: 'email',
            value: email,
        });
    }

    if (privacy !== undefined) {
        await User.editField({
            userId: userId,
            field: 'privacy',
            value: privacy,
        });
    }

    if (password !== undefined) {
        const hashedPass = await bcrypt.hash(password, 12);
        await User.editField({
            userId: userId,
            field: 'password',
            value: hashedPass,
        });
    }
}
