import path from 'path';
import fs from 'fs';
import sharp from 'sharp';
import { getRandomString } from '../../util/general-helpers.js';

export const resizeImage = async (req, res, next) => {
    if (req.imageError || !req.file) {
        return next();
    }

    // Build image directory + filename
    const filename = `${Date.now()}-${getRandomString(10)}`;
    const dir = path.join('public', 'images');

    // Create the directory if it doesn't exist
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }

    // Resize Image
    await sharp(req.file.buffer).resize({ width: 1000 }).toFile(`${dir}/${filename}`);

    // Attach image filename to request and continue to controller
    req.imageSrc = filename;
    next();
};
