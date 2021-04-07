dotenv.config();
import _cloudinary from 'cloudinary';

const cloudinary = _cloudinary.v2;

cloudinary.config({
    cloud_name: env.process.CLOUD_NAME,
    api_key: env.process.CLOUD_API_KEY,
    api_secret: env.process.CLOUD_API_SECRET,
});

export async function uploadImage(file) {
    const response = await cloudinary.uploader.upload(file, {
        folder: 'image',
    });
    return response;
}

export async function uploadVideo(file) {
    const response = await cloudinary.uploader.upload(file, {
        folder: 'video',
    });
    return response;
}

export default cloudinary;
