import Joi from 'joi';
import Response from '../../helpers/commonResponse';

export const createExamSchema = Joi.object({
    title: Joi.string().min(3).max(100).required(),
    description: Joi.string().min(3).max(500),
    questions: Joi.array()
        .items(
            Joi.object({
                question: Joi.string().min(3).max(500).required(),
                options: Joi.array()
                    .items(Joi.string().min(3).max(500))
                    .length(4)
                    .required(),
                answer: Joi.number().integer().min(0).max(3),
                explanation: Joi.string().min(3).max(500),
            })
        )
        .required(),
});

export const updateExamSchema = Joi.object({
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
        }).required()
    ),
    deletedCommentId: Joi.string().allow(null),
    score: Joi.number().min(0).allow(null),
});

export function validateCreateExam(req, res, next) {
    const { error } = createExamSchema.validate(req.body);
    if (error) {
        return res.status(422).send(new Response(422, error?.details));
    }
    next();
}

export function validateUpdateExam(req, res, next) {
    const { error } = updateExamSchema.validate(req.body);
    if (error) {
        return res.status(422).send(new Response(422, error?.details));
    }
    next();
}
