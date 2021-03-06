import Joi from 'joi';
import Response from '../../helpers/commonResponse';

export const articleSchema = Joi.object({
    title: Joi.string().min(3).max(100).required(),
    description: Joi.string().min(3).max(150).allow('').allow(null),
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

export const updateArticleSchema = Joi.object({
    title: Joi.string().min(3).max(100),
    description: Joi.string().min(3).max(150).allow('').allow(null),
    paragraph: Joi.array().items(Joi.string().max(700)),
    image: Joi.string().allow(null),
    like: Joi.boolean(),
    comment: Joi.string().min(1).max(500),
    deletedCommentId: Joi.string().allow(null),
});

export function validateCreateArticle(req, res, next) {
    const { error } = articleSchema.validate(req.body);
    if (error) {
        return res.status(422).send(new Response(422, error?.details));
    }
    next();
}

export function validateUpdateArticle(req, res, next) {
    const { error } = updateArticleSchema.validate(req.body);
    if (error) {
        return res.status(422).send(new Response(422, error?.details));
    }
    next();
}
