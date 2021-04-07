import multer from 'multer';
import path from 'path';
import Response from '../helpers/commonResponse';

export const uploadImage = (req, res, next) => {
    try {
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
                    cb('Image type must be jpeg, jpg or png.', false);
                }
            },
        }).single('image');
        upload(req, res, function (err) {
            if (err) {
                return res.status(422).send(new Response(422, err));
            }
            next();
        });
    } catch (err) {
        console.log('Error in uploadImage func', err);
        res.status(500).send(new Response(500, err));
    }
};
