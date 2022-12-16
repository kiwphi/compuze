import {
    createAuthToken,
    createResetTokens,
    createUser,
    removeUserTokens,
    storeHashedToken,
    verifyToken,
} from '../services/auth-service.js';
import { sendMail } from '../services/email-service.js';
import { findUserByEmail, findUserByUsername, modifyUser } from '../services/user-service.js';

// POST /auth/login
export async function login(req, res, next) {
    try {
        if (req.errors.length) {
            return res.status(401).json({
                success: false,
                message: 'Login failed',
                errors: req.errors,
            });
        }

        const user = await findUserByUsername(req.body.username);
        const token = await createAuthToken(user);

        return res
            .status(200)
            .cookie('token', token, {
                httpOnly: true,
                secure: true,
                SameSite: 'none',
            })
            .json({
                success: true,
                message: 'Login successful',
            });
    } catch (err) {
        next(err);
    }
}

// POST /auth/signup
export async function signUp(req, res, next) {
    try {
        if (req.errors.length) {
            return res.status(422).json({
                success: false,
                message: 'Signup failed',
                errors: req.errors,
            });
        }

        await createUser({
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            phone: req.body.phone,
        });

        return res.status(201).json({
            success: true,
            message: 'Signup successful',
            data: {
                username: req.body.username,
                email: req.body.password,
                phone: req.body.phone,
            },
        });
    } catch (err) {
        next(err);
    }
}

// GET /auth/whoami
export async function whoami(req, res, next) {
    try {
        res.status(200).json({
            success: true,
            message: 'Found who I am',
            data: {
                username: req.user.username,
                userId: req.user.id,
            },
        });
    } catch (err) {
        next(err);
    }
}

// POST /auth/logout
export async function logout(req, res, next) {
    try {
        return res
            .status(200)
            .clearCookie('token', {
                httpOnly: true,
                secure: true,
                SameSite: 'none',
            })
            .json({
                success: true,
                message: 'Logged-out successfully',
            });
    } catch (err) {
        next(err);
    }
}

// POST /auth/forgot
export async function forgot(req, res, next) {
    try {
        if (req.errors.length) {
            return res.status(401).json({
                success: false,
                message: 'Reset request failed',
                errors: req.errors,
            });
        }

        const user = await findUserByEmail(req.body.email);

        // delete existing tokens, if any
        await removeUserTokens(user.id);

        // create new tokens
        const tokens = await createResetTokens();

        // email plain token
        sendMail({
            to: user.email,
            subject: 'Compuze | Reset Password Link',
            html: `${process.env.FRONTEND_DOMAIN}/auth/reset?token=${tokens.plainToken}&userId=${user.id}`,
        });

        // store hashed token in db
        await storeHashedToken(user.id, tokens.hashedToken);

        return res.status(200).json({
            success: true,
            message: 'Password reset email sent',
        });
    } catch (err) {
        next(err);
    }
}

// POST /auth/reset
export async function reset(req, res, next) {
    try {
        if (req.errors.length) {
            return res.status(401).json({
                success: false,
                message: 'Reset request failed',
                errors: req.errors,
            });
        }

        if (!(await verifyToken(req.body.userId, req.body.token))) {
            return res.status(401).json({
                success: false,
                message: 'Could not validate token',
                errors: ['Invalid Token'],
            });
        }

        await modifyUser({
            userId: req.body.userId,
            password: req.body.password,
        });

        await removeUserTokens(req.body.userId);

        return res.status(200).json({
            success: true,
            message: 'Password reset successfully',
        });
    } catch (err) {
        next(err);
    }
}
