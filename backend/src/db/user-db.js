import { db } from '../util/db-connection.js';

export class User {
    constructor({ username, password, email, phone }) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.phone = phone;
        this.privacy = 0;
        this.last_msg_sent = Date.now();
        this.createdAt = Date.now();
    }

    async save() {
        await db('users').insert({
            username: this.username,
            password: this.password,
            email: this.email,
            phone: this.phone,
            privacy: this.privacy,
            last_msg_sent: this.last_msg_sent,
            created_at: this.createdAt,
        });
    }

    static async fetchAll() {
        const users = await db('users').select('users.username');
        if (!users.length) return [];
        return users;
    }

    static async fetchById(userId) {
        const user = await db('users').where({ id: userId });
        if (!user.length) return false;
        return user[0];
    }

    static async fetchByUsername(username) {
        const user = await db('users').where({ username: username });
        if (!user.length) return false;
        return user[0];
    }

    static async fetchByEmail(email) {
        const user = await db('users').where({ email: email });
        if (!user.length) return false;
        return user[0];
    }

    static async editField({ userId, field, value }) {
        return await db('users')
            .where({ id: userId })
            .update({ [field]: value });
    }
}
