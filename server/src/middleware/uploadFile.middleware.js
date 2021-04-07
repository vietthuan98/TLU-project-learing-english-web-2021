import multer from 'multer';
import path from 'path';

export const uploadImage = (req, res, next) => {
    const upload = multer({
        limits: { fileSize: 15000000 },
        fileFilter: (req, file, cb) => {
            const fileTypes = /jpeg|jpg|png/;
            const extname = fileTypes.test(
                path.extname(file.originalname).toLowerCase()
            );
            const mimetype = fileTypes.test(file.mimetype);
            if (mimetype && extname) {
                return cb(null, true);
            } else {
                cb('`', false);
            }
        },
    }).single('image');
};
