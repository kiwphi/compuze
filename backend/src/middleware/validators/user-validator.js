import { comparePasswords } from '../../services/auth-service.js';
import { findUserByEmail, findUserByUsername } from '../../services/user-service.js';
import { randomInRange } from '../../util/general-helpers.js';
import { isPasswordValid, isPhoneValid, isUsernameValid } from './validation-helpers.js';
import validator from 'validator';

export async function validateSignup(req, res, next) {
    if (!isUsernameValid(req.body.username)) {
        req.errors.push('Username must be at least 3 characters long and cannot contain special characters');
    } else {
        if (await findUserByUsername(req.body.username)) {
            req.errors.push('Username already taken');
        }
    }

    if (!isPhoneValid(req.body.phone)) {
        req.errors.push('Please enter a valid phone number');
    }

    if (!validator.isEmail(req.body.email)) {
        req.errors.push('Please enter a valid email address');
    } else {
        if (await findUserByEmail(req.body.email)) {
            req.errors.push('Email already registered');
        }
    }

    if (!isPasswordValid(req.body.password)) {
        req.errors.push('Password should be 8 character at least, with 1 lowercase and 1 uppercase character');
    } else {
        if (req.body.password !== req.body.repeatPassword) {
            req.errors.push('Passwords do not match');
        }
    }

    next();
}

export async function validateLogin(req, res, next) {
    if (!isUsernameValid(req.body.username)) {
        req.errors = ['Login failed'];
    }

    const user = await findUserByUsername(req.body.username);

    if (!user) {
        req.errors = ['Login failed'];
    }

    if (!isPasswordValid(req.body.password) || (user && !(await comparePasswords(req.body.password, user.password)))) {
        req.errors = ['Login failed'];
    }

    // artificial random delay
    setTimeout(next, randomInRange(250, 1750));
}

export async function validateForgot(req, res, next) {
    if (!validator.isEmail(req.body.email)) {
        req.errors.push('Please enter a valid email address');
    } else {
        if (!(await findUserByEmail(req.body.email))) {
            req.errors.push('Email is not registered');
        }
    }

    next();
}

export async function validateEdit(req, res, next) {
    if (req.body.phone !== undefined && !isPhoneValid(req.body.phone)) {
        req.errors.push('Please enter a valid phone number');
    }

    if (req.body.email !== undefined) {
        if (!validator.isEmail(req.body.email)) {
            req.errors.push('Please enter a valid email address');
        } else {
            if (await findUserByEmail(req.body.email)) {
                req.errors.push('Email is already registered');
            }
        }
    }

    if (req.body.password !== undefined && !isPasswordValid(req.body.password)) {
        req.errors.push('Password should be 8 character at least, with 1 lowercase and 1 uppercase character');
    } else {
        if (req.body.password !== req.body.repeatPassword) {
            req.errors.push('Passwords do not match');
        }
    }
    next();
}

export async function validateReset(req, res, next) {
    if (!isPasswordValid(req.body.password)) {
        req.errors.push('Password should be 8 character at least, with 1 lowercase and 1 uppercase character');
    } else {
        if (req.body.password !== req.body.repeatPassword) {
            req.errors.push('Passwords do not match');
        }
    }

    if (!req.body.token) {
        req.errors.push('No token provided');
    }

    if (!req.body.userId) {
        req.errors.push('No User ID provided');
    }
    next();
}
