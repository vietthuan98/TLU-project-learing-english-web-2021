import Joi from 'joi';
import Response from '../../helpers/commonResponse';
import { USER_ROLE } from '../users/user.model';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
const PHONE_REGEX = /^\d{10,11}$/;
const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,30}$/;

export const registerSchema = Joi.object({
    name: Joi.string().max(50).required(),
    phone: Joi.string().pattern(PHONE_REGEX).required(),
    address: Joi.string().allow(null),
    email: Joi.string().pattern(EMAIL_REGEX).required(),
    roles: Joi.array()
        .items(Joi.string().valid(...Object.values(USER_ROLE)))
        .required(),
    password: Joi.string().pattern(PASSWORD_REGEX).required(),
});

export const updateProfileSchema = Joi.object({
    name: Joi.string().max(50).allow(null).allow(''),
    phone: Joi.string().pattern(PHONE_REGEX).allow(null).allow(''),
    address: Joi.string().allow(null).allow(''),
    roles: Joi.array()
        .items(Joi.string().valid(...Object.values(USER_ROLE)))
        .allow(null),
    password: Joi.string().pattern(PASSWORD_REGEX).allow(null),
    newPassword: Joi.string().pattern(PASSWORD_REGEX).allow(null),
});

export function validateRegister(req, res, next) {
    const { error } = registerSchema.validate(req.body);
    if (error) {
        return res.send(new Response(422, error?.details));
    }
    next();
}

export function validateUpdateProfile(req, res, next) {
    const { error } = updateProfileSchema.validate(req.body);
    if (error) {
        return res.send(new Response(422, error?.details));
    }
    next();
}
