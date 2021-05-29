import Joi from 'joi';
import Response from '../../helpers/commonResponse';

export const videoSchema = Joi.object({
    title: Joi.string().min(3).max(150).required(),
    description: Joi.string().min(3).max(500).allow('').allow(null),
    src: Joi.string().allow(null),
    duration: Joi.number().min(0),
    cues: Joi.array().items(
        Joi.object({
            identifier: Joi.string().allow('').required(),
            start: Joi.number().min(0).required(),
            end: Joi.number().min(0).required(),
            text: Joi.string().min(3).max(500).required(),
            styles: Joi.string().allow('').required(),
        })
    ),
});

export const updateVideoSchema = Joi.object({
    title: Joi.string().min(3).max(150),
    description: Joi.string().min(3).max(500),
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
