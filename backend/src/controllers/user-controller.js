import { findUserById, findUsers, modifyUser } from '../services/user-service.js';

// GET /users
export async function getUsers(req, res, next) {
    try {
        const users = await findUsers();

        res.status(200).json({
            success: true,
            message: 'Fetched users successfully',
            data: {
                users: users,
            },
        });
    } catch (err) {
        next(err);
    }
}

// GET /users/[userId]
export async function getUser(req, res, next) {
    try {
        const user = await findUserById(req.params.userId);

        if (!user) {
            return next();
        }

        res.status(200).json({
            success: true,
            message: 'User found',
            data: {
                user: user,
            },
        });
    } catch (err) {
        next(err);
    }
}

// PATCH /users/[userId]
export async function patchUser(req, res, next) {
    try {
        const user = await findUserById(req.params.userId);

        if (!user) {
            // user not found -> 404
            return next();
        }

        if (!(req.user.id === user.id)) {
            // trying to patch another user
            return res.status(403).json({
                success: false,
                message: 'Not authorized to modify user',
            });
        }

        if (req.errors.length) {
            return res.status(422).json({
                success: false,
                message: 'Failed to update user',
                errors: req.errors,
            });
        }

        await modifyUser({
            userId: req.params.userId,
            phone: req.body.phone,
            email: req.body.email,
            privacy: req.body.privacy,
            password: req.body.password,
        });

        const updatedUser = await findUserById(user.id);

        return res.status(201).json({
            success: true,
            message: 'User successfully updated',
            data: {
                user: updatedUser,
            },
        });
    } catch (err) {
        next(err);
    }
}
