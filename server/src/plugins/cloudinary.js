import dotenv from 'dotenv';
dotenv.config();
import _cloudinary from 'cloudinary';

const cloudinary = _cloudinary.v2;

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
});

const uploadFile = (file, options = {}) => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader
            .upload_stream(options, (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            })
            .end(file);
    });
};

export async function uploadImage(file) {
    try {
        const response = await uploadFile(file, {
            folder: 'articleImages',
            unique_filename: true,
        });
        return response;
    } catch (err) {
        console.log('Error in uploadImage func: ', err);
        throw new Error(err);
    }
}

export async function uploadVideo(file) {
    try {
        const response = await uploadFile(file, {
            folder: 'videos',
            unique_filename: true,
            resource_type: 'video',
        });
        console.log('63 res', response);
        return response;
    } catch (err) {
        console.log('Error in uploadVideo in plugins cloudinary func: ', err);
        throw new Error(err);
    }
}

export default cloudinary;
