export function allowHeaders(req, res, next) {
    res.header('Access-Control-Allow-Origin', process.env.FRONTEND_DOMAIN);
    res.header('Access-Control-Allow-Methods', 'OPTIONS, GET, PUT, PATCH, POST, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Credentials', true);
    next();
}
