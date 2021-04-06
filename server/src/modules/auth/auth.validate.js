import Joi from 'joi';
import Response from '../../helpers/commonResponse';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
const PHONE_REGEX = /^\d{10,11}$/;
const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,30}$/;

export const registerSchema = Joi.object({
    name: Joi.string().max(50).required(),
    phone: Joi.string().pattern(PHONE_REGEX).required(),
    address: Joi.string().allow(null),
    email: Joi.string().pattern(EMAIL_REGEX).required(),
    password: Joi.string().pattern(PASSWORD_REGEX).required(),
});

export function validateRegister(req, res, next) {
    const { error } = registerSchema.validate(req.body);
    if (error) {
        return res.send(new Response(422, error?.details));
    }
    next();
}
