import Joi from 'joi';
import Response from '../../helpers/commonResponse';

export const articleSchema = Joi.object({
    title: Joi.string().min(3).max(100).required(),
    paragraph: Joi.array().items(Joi.string()).required(),
    image: Joi.string().allow(null),
    likes: Joi.array().items(Joi.string()),
    comments: Joi.array().items(
        Joi.object({
            message: Joi.string().required,
            userId: Joi.string().allow(null),
        })
    ),
});

export function validateCreateArticle(req, res, next) {
    const { error } = articleSchema.validate(req.body);
    if (error) {
        return res.send(new Response(422, error?.details));
    }
    next();
}
