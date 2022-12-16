import validator from 'validator';
import { ITEM_TYPES } from '../../util/constants.js';

export function validateItem(req, res, next) {
    if (!ITEM_TYPES.includes(req.body.type)) {
        req.errors.push('Please select a type');
    }

    if (!validator.isLength(req.body.brand, { min: 1, max: 50 })) {
        req.errors.push('Please enter a brand');
    }

    if (!validator.isLength(req.body.model, { min: 1, max: 50 })) {
        req.errors.push('Please enter a model number');
    }

    if (!validator.isLength(req.body.description, { min: 1, max: 254 })) {
        req.errors.push('Please type a description');
    }

    if (!validator.isLength(req.body.location, { min: 1, max: 50 })) {
        req.errors.push(`Please enter the item's location`);
    }

    if (!validator.isInt(req.body.price, { min: 0, max: 9999999 })) {
        req.errors.push(`Please enter a valid price`);
    }

    next();
}
