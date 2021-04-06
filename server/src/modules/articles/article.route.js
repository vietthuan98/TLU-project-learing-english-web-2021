import {
    createArticle,
    getArticles,
    getMyArticles,
    getArticleDetail,
} from './article.controller';
import { authenticate } from '../../middleware/auth.middleware';
import { validateCreateArticle } from './article.validate';

const articleRoute = (router) => {
    router.get('/articles', authenticate, getArticles);
    router.get('/articles/me', authenticate, getMyArticles);
    router.get('/articles/:id', authenticate, getArticleDetail);
    router.post(
        '/articles',
        authenticate,
        validateCreateArticle,
        createArticle
    );
};

export default articleRoute;
