function trimObject(obj) {
    if (obj !== null && typeof obj === 'object') {
        for (let prop in obj) {
            if (typeof obj[prop] === 'object') {
                return trimObject(obj[prop]);
            }

            if (typeof obj[prop] === 'string') {
                obj[prop] = obj[prop].trim();
            }
        }
    }
}

export function trimBody(req, res, next) {
    trimObject(req.body);
    next();
}
