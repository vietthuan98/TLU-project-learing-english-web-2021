import {
    createArticle,
    getArticles,
    getMyArticles,
    getArticleDetail,
    updateArticle,
    uploadArticleImage,
} from './article.controller';
import { authenticate, checkUserRoles } from '../../middleware/auth.middleware';
import {
    validateCreateArticle,
    validateUpdateArticle,
} from './article.validate';
import { uploadImage } from '../../middleware/uploadFile.middleware';
import { USER_ROLE } from '../users/user.model';

const articleRoute = (router) => {
    router.get('/articles', authenticate, getArticles);
    router.get('/articles/me', authenticate, getMyArticles);
    router.get('/articles/:id', authenticate, getArticleDetail);
    router.post(
        '/articles/image',
        authenticate,
        checkUserRoles([USER_ROLE.TEACHER]),
        uploadImage,
        uploadArticleImage
    );
    router.post(
        '/articles',
        authenticate,
        checkUserRoles([USER_ROLE.TEACHER]),
        validateCreateArticle,
        createArticle
    );
    router.patch(
        '/articles/:id',
        authenticate,
        validateUpdateArticle,
        updateArticle
    );
};

export default articleRoute;
