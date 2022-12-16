import { findUserByUsername } from '../../services/user-service.js';
import { isUsernameValid } from './validation-helpers.js';
import validator from 'validator';

export async function validateMessage(req, res, next) {
    if (!validator.isLength(req.body.subject, { min: 1, max: 254 })) {
        req.errors.push('Subject cannot be empty');
    }

    if (!validator.isLength(req.body.content, { min: 1, max: 254 })) {
        req.errors.push('Message content cannot be empty');
    }

    if (!isUsernameValid(req.body.recipientUsername)) {
        req.errors.push('Username cannot be empty');
    } else {
        if (!(await findUserByUsername(req.body.recipientUsername))) {
            req.errors.push('User does not exist');
        }
    }

    next();
}
