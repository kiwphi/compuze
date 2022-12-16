import multer from 'multer';

const MAX_SIZE = 2000000; // 2MB

const imageHandler = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: MAX_SIZE },
    fileFilter: fileFilter,
}).single('image');

export function checkImage(req, res, next) {
    try {
        imageHandler(req, res, function (err) {
            if (err) {
                req.imageError = true;
            }
            next();
        });
    } catch (err) {
        next(err);
    }
}

function fileFilter(req, file, cb) {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
        return cb(null, true);
    }
    return cb(null, false);
}
