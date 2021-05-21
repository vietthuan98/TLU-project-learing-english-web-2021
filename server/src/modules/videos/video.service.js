import Video from './video.model';

export const attrVideos = [
    '_id',
    'title',
    'src',
    'description',
    'likes',
    'author',
    'comments',
    'cues',
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

export async function updateVideoToDB(data, video) {
    try {
        const {
            title,
            description,
            src,
            like,
            comment,
            deletedCommentId,
            user,
        } = data;
        if (typeof like === 'boolean') {
            if (!video.likes.includes(user._id) && like) {
                video.likes.push(user._id);
            } else if (video.likes.length) {
                video.likes.pull({ _id: user._id });
            }
        }

        if (comment) {
            video.comments.push({
                message: comment,
                userId: user._id,
            });
        }

        if (deletedCommentId && video.comments.length) {
            video.comments.pull({ _id: deletedCommentId });
        }
        if (title) {
            video.title = title;
        }
        if (description) {
            video.description = description;
        }
        if (src) {
            video.src = src;
        }
        await video.save();
        return await findArticleDetail({
            _id: video._id,
            author: video.author._id,
        });
    } catch (error) {
        console.log(`Error in updateVideoToDB func: ${error.stack}`);
        throw new Error();
    }
}
