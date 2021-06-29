import Response from '../../helpers/commonResponse';
import Video from './video.model';
import {
    findVideos,
    attrVideos,
    findVideoDetail,
    updateVideoToDB,
} from './video.service';
import { uploadVideo as uploadVidePlugin } from '../../plugins/cloudinary';

export const getVideos = async (req, res) => {
    try {
        const { query } = req;
        let queryItems = undefined;
        if (query.title) {
            queryItems = { title: { $regex: query.title, $options: 'i' } };
        }

        const [items, total] = await Promise.all([
            findVideos(attrVideos, query.limit, query.page, queryItems),
            Video.countDocuments(queryItems),
        ]);
        res.status(200).send(
            new Response(200, 'Get video list successfully', {
                items,
                total,
            })
        );
    } catch (err) {
        console.log('Error in getVideos func', err);
        res.status(400).send(new Response(400, err.message));
    }
};

export const createVideo = async (req, res) => {
    try {
        const { body, user } = req;
        const video = new Video(body);
        video.author = user._id;
        user.videos.push(video._id);
        await Promise.all([video.save(), user.save()]);

        return res.status(200).send(
            new Response(200, 'Video created successfully', {
                user,
                video,
            })
        );
    } catch (err) {
        console.log('Error in createVideo func', err);
        return res.status(400).send(new Response(400, err.message));
    }
};

export const getMyVideos = async (req, res) => {
    try {
        const { user, query } = req;
        const _query = {
            author: user._id,
        };

        const [items, total] = await Promise.all([
            findVideos(attrVideos, query.limit, query.page, _query),
            Video.count(_query),
        ]);
        return res.status(200).send(
            new Response(200, 'Get your videos list successfully', {
                items,
                total,
            })
        );
    } catch (err) {
        console.log('Error in getMyVideos func', err);
        return res.status(400).send(new Response(400, err.message));
    }
};

export const getVideoDetail = async (req, res) => {
    try {
        const video = await findVideoDetail({
            _id: req.params.id,
        });
        if (!video) {
            return res
                .status(404)
                .send(new Response(404, 'Video is not found'));
        }
        return res
            .status(200)
            .send(new Response(200, 'Your video here', video));
    } catch (err) {
        console.log('Error in getVideoDetail func', err);
        return res.status(500).send(new Response(500, err.message));
    }
};

export const updateVideo = async (req, res) => {
    try {
        const { user, body } = req;
        body.user = user;
        const video = await Video.findOne({
            _id: req.params.id,
        });
        if (!video) {
            return res
                .status(404)
                .send(new Response(404, 'Video is not found'));
        }
        if (body.title || body.description || body.paragraph?.length) {
            if (video.author.toString() !== user._id.toString())
                return res
                    .status(403)
                    .send(new Response(403, 'You do not have permission'));
        }
        const videoData = await updateVideoToDB(body, video);
        return res
            .status(200)
            .send(new Response(200, 'Your video updated', videoData));
    } catch (err) {
        console.log('Error in updateVideo func', err);
        return res.status(500).send(new Response(500, err.message));
    }
};

export const uploadVideoToCloud = async (req, res) => {
    try {
        const { file } = req;
        if (!file) {
            return res
                .status(500)
                .send(
                    new Response(
                        500,
                        'Something wrongs when upload video to cloud'
                    )
                );
        }
        const { url } = await uploadVidePlugin(file.buffer);

        return res
            .status(200)
            .send(new Response(200, 'Video uploaded.', { url }));
    } catch (err) {
        console.log('Error in uploadVideoToCloud func: ', err);
        return res.status(500).send(new Response(500, err));
    }
};

export const deleteVideo = async (req, res) => {
    try {
        const { user, params } = req;

        const video = await Video.findById(params.id);
        if (!video) {
            return res.status(200).send(
                new Response(200, 'This video has been deleted', {
                    id: params.id,
                })
            );
        }
        const isAuthor = user._id.toString() === video.author.toString();
        if (!isAuthor) {
            return res
                .status(400)
                .send(
                    new Response(
                        400,
                        'You have no permission to delete this video.'
                    )
                );
        }
        await Video.deleteOne({ _id: video._id });

        return res.status(200).send(
            new Response(200, 'This video has been deleted', {
                id: params.id,
            })
        );
    } catch (err) {
        console.log('Error in deleteVideo func: ', err);
        return res.status(500).send(new Response(500, err));
    }
};
