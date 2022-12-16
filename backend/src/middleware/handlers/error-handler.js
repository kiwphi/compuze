export function error404(req, res) {
    res.status(404).json({
        success: false,
        message: '404: The requested resource does not exist.',
    });
}

export function errorInternal(err, req, res, next) {
    console.log(err);
    res.status(err.status || 500).json({ success: false, message: '500: Internal error.' });
}

export function addErrorsArray(req, res, next) {
    req.errors = [];
    next();
}
