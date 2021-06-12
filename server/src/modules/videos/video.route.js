import {
    getVideos,
    getMyVideos,
    getVideoDetail,
    uploadVideoToCloud,
    createVideo,
    updateVideo,
} from './video.controller';
import { authenticate, checkUserRoles } from '../../middleware/auth.middleware';
import { USER_ROLE } from '../users/user.model';
import { validateCreateVideo, validateUpdateVideo } from './video.validate';
import { uploadVideo as uploadVideoMiddleware } from '../../middleware/uploadFile.middleware';

const videoRoute = (router) => {
    router.get('/videos', authenticate, getVideos);
    router.get('/videos/me', authenticate, getMyVideos);
    router.get('/videos/:id', authenticate, getVideoDetail);
    router.post(
        '/videos/upload-to-cloud',
        authenticate,
        checkUserRoles([USER_ROLE.TEACHER]),
        uploadVideoMiddleware,
        uploadVideoToCloud
    );
    router.post(
        '/videos',
        authenticate,
        checkUserRoles([USER_ROLE.TEACHER]),
        validateCreateVideo,
        createVideo
    );
    router.patch('/videos/:id', authenticate, validateUpdateVideo, updateVideo);
};

export default videoRoute;
