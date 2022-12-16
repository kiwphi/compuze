import validator from 'validator';

export async function validateComment(req, res, next) {
    if (!validator.isLength(req.body.content, { min: 1, max: 254 })) {
        req.errors.push('Comment is empty');
    }

    next();
}
