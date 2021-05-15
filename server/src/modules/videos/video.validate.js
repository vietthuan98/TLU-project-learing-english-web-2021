import Joi from 'joi';
import Response from '../../helpers/commonResponse';

export const videoSchema = Joi.object({
    title: Joi.string().min(3).max(100).required(),
    description: Joi.string().min(3).max(150),
    paragraph: Joi.array().items(Joi.string().max(700)).required(),
    image: Joi.string().allow(null),
    likes: Joi.array().items(Joi.string()),
    comments: Joi.array().items(
        Joi.object({
            message: Joi.string().min(1).max(500).required(),
            userId: Joi.string().allow(null),
        })
    ),
});

export const updateVideoSchema = Joi.object({
    title: Joi.string().min(3).max(100),
    description: Joi.string().min(3).max(150),
    paragraph: Joi.array().items(Joi.string().max(700)),
    image: Joi.string().allow(null),
    like: Joi.boolean(),
    comment: Joi.string().min(1).max(500),
    deletedCommentId: Joi.string().allow(null),
});

export function validateCreateVideo(req, res, next) {
    const { error } = videoSchema.validate(req.body);
    if (error) {
        return res.status(422).send(new Response(422, error?.details));
    }
    next();
}

export function validateUpdateVideo(req, res, next) {
    const { error } = updateVideoSchema.validate(req.body);
    if (error) {
        return res.status(422).send(new Response(422, error?.details));
    }
    next();
}
