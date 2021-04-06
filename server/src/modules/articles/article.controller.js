import Response from '../../helpers/commonResponse';
import Article from './article.model';
import { findArticles, attrArticles } from './article.service';

export const getArticles = async (req, res) => {
    try {
        const { query } = req;

        const [items, total] = await Promise.all([
            findArticles(attrArticles, query.limit, query.page),
            Article.count(),
        ]);
        res.status(200).send(
            new Response(200, 'Get article list successfully', {
                items,
                total,
            })
        );
    } catch (err) {
        console.log('Error in getArticles func', err);
        res.status(400).send(new Response(400, err.message));
    }
};

export const createArticle = async (req, res) => {
    try {
        const { body, user } = req;
        const article = new Article(body);
        article.author = user._id;
        user.articles.push(article._id);
        await Promise.all([article.save(), user.save()]);

        return res.status(200).send(
            new Response(200, 'Article created successfully', {
                user,
                article,
            })
        );
    } catch (err) {
        console.log('Error in createArticle func', err);
        return res.status(400).send(new Response(400, err.message));
    }
};

export const getMyArticles = async (req, res) => {
    try {
        const { user, query } = req;
        const _query = {
            author: user._id,
        };

        const [items, total] = await Promise.all([
            findArticles(attrArticles, query.limit, query.page, _query),
            Article.count(_query),
        ]);
        return res.status(200).send(
            new Response(200, 'Get article list successfully', {
                items,
                total,
            })
        );
    } catch (err) {
        console.log('Error in getMyArticles func', err);
        return res.status(400).send(new Response(400, err.message));
    }
};

export const getArticleDetail = async (req, res) => {
    try {
        const { user } = req;
        const article = await Article.findOne({
            _id: req.params.id,
            author: user._id,
        });
        if (!article) {
            return res
                .status(404)
                .send(new Response(404, 'Article is not found'));
        }
        return res
            .status(200)
            .send(new Response(200, 'Your article here', article));
    } catch (err) {
        console.log('Error in getArticleDetail func', err);
        return res.status(500).send(new Response(500, err.message));
    }
};
