import Article from './article.model';

export const attrArticles = [
    '_id',
    'title',
    'paragraph',
    'description',
    'likes',
    'image',
    'comments',
    'author',
    'createdAt',
    'updatedAt',
];

export async function findArticles(attr = attrArticles, limit, page, query) {
    try {
        const _limit = +limit || 10;
        const _skip = _limit * (+page - 1 || 0);

        const articles = await Article.find(query)
            .limit(_limit)
            .skip(_skip)
            .select(attr)
            .populate('author', ['name']);
        return articles;
    } catch (error) {
        console.log(`Error in findArticles func: ${error.stack}`);
        throw new Error();
    }
}

export async function findArticleDetail(data) {
    try {
        const article = await Article.findOne(data)
            .populate('author', ['phone', 'name', 'email'])
            .populate('likes', ['name'])
            .populate('comments.userId', ['name']);
        return article;
    } catch (error) {
        console.log(`Error in findArticleDetail func: ${error.stack}`);
        throw new Error();
    }
}

export async function updateArticleToDB(data, article) {
    try {
        const {
            title,
            paragraph,
            description,
            image,
            like,
            comment,
            deletedCommentId,
            user,
        } = data;
        if (typeof like === 'boolean') {
            if (!article.likes.includes(user._id) && like) {
                article.likes.push(user._id);
            } else if (article.likes.length) {
                article.likes.pull({ _id: user._id });
            }
        }

        if (comment) {
            article.comments.push({
                message: comment,
                userId: user._id,
            });
        }

        if (deletedCommentId && article.comments.length) {
            article.comments.pull({ _id: deletedCommentId });
        }

        if (title) {
            article.title = title;
        }
        if (description) {
            article.description = description;
        }
        if (paragraph) {
            article.paragraph = paragraph;
        }
        if (image) {
            article.image = image;
        }
        await article.save();
        const articleData = await findArticleDetail({
            _id: article._id,
            author: article.author._id,
        });

        return articleData;
    } catch (error) {
        console.log(`Error in updateArticleToDB func: ${error.stack}`);
        throw new Error();
    }
}
