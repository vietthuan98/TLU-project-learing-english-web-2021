import Joi from 'joi';
import Response from '../../helpers/commonResponse';

export const createExampleSchema = Joi.object({
    title: Joi.string().min(3).max(100).required(),
    description: Joi.string().min(3).max(500),
    questions: Joi.array()
        .items(
            Joi.object({
                question: Joi.string().min(3).max(500).required(),
                options: Joi.array()
                    .items(Joi.string().max(500))
                    .length(4)
                    .required(),
                answer: Joi.number().integer().min(0).max(3),
                explanation: Joi.string().min(3).max(500),
            })
        )
        .required(),
});

export const updateExampleSchema = Joi.object({
    title: Joi.string().min(3).max(100),
    description: Joi.string().min(3).max(500),
    comment: Joi.string().min(1).max(500),
    questions: Joi.array().items(
        Joi.object({
            question: Joi.string().required(),
            options: Joi.array()
                .items(Joi.string().max(500))
                .length(4)
                .required(),
            answer: Joi.number().integer().min(0).max(3),
            explanation: Joi.string().min(3).max(500),
        })
    ),
    deletedCommentId: Joi.string().allow(null),
    score: Joi.number().min(0).allow(null),
});

export function validateCreateExample(req, res, next) {
    const { error } = createExampleSchema.validate(req.body);
    if (error) {
        return res.status(422).send(new Response(422, error?.details));
    }
    next();
}

export function validateUpdateExample(req, res, next) {
    const { error } = updateExampleSchema.validate(req.body);
    if (error) {
        return res.status(422).send(new Response(422, error?.details));
    }
    next();
}
