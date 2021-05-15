import Video from './video.model';

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

export async function findVideos(attr, limit, page, query) {
    try {
        const _limit = +limit || 10;
        const _skip = _limit * (+page - 1 || 0);

        const videos = await Video.find(query)
            .limit(_limit)
            .skip(_skip)
            .select(attr)
            .populate('author', ['name']);
        return videos;
    } catch (error) {
        console.log(`Error in findVideos func: ${error.stack}`);
        throw new Error();
    }
}

export async function findVideoDetail(data) {
    try {
        const article = await Video.findOne(data)
            .populate('author', ['phone', 'name', 'email'])
            .populate('likes', ['name'])
            .populate('comments.userId', ['name']);
        return article;
    } catch (error) {
        console.log(`Error in findVideoDetail func: ${error.stack}`);
        throw new Error();
    }
}

export async function updateVideoToDB(data, article) {
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
        console.log(`Error in updateVideoToDB func: ${error.stack}`);
        throw new Error();
    }
}
