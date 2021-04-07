import {
    createArticle,
    getArticles,
    getMyArticles,
    getArticleDetail,
    updateArticle,
    uploadArticleImage,
} from './article.controller';
import { authenticate } from '../../middleware/auth.middleware';
import {
    validateCreateArticle,
    validateUpdateArticle,
} from './article.validate';
import { uploadImage } from '../../middleware/uploadFile.middleware';

const articleRoute = (router) => {
    router.get('/articles', authenticate, getArticles);
    router.get('/articles/me', authenticate, getMyArticles);
    router.get('/articles/:id', authenticate, getArticleDetail);
    router.post(
        '/articles/image',
        authenticate,
        uploadImage,
        uploadArticleImage
    );
    router.post(
        '/articles',
        authenticate,
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
