import {
    getVideos,
    getMyVideos,
    getVideoDetail,
    uploadVideoToCloud,
    createVideo,
    updateVideo,
} from './video.controller';
import { authenticate } from '../../middleware/auth.middleware';
import { validateCreateVideo, validateUpdateVideo } from './video.validate';
import { uploadVideo as uploadVideoMiddleware } from '../../middleware/uploadFile.middleware';

const videoRoute = (router) => {
    router.get('/videos', authenticate, getVideos);
    router.get('/videos/me', authenticate, getMyVideos);
    router.get('/videos/:id', authenticate, getVideoDetail);
    router.post(
        '/videos-to-cloud',
        authenticate,
        uploadVideoMiddleware,
        uploadVideoToCloud
    );
    router.post('/videos', authenticate, validateCreateVideo, createVideo);
    router.patch('/videos/:id', authenticate, validateUpdateVideo, updateVideo);
};

export default videoRoute;
