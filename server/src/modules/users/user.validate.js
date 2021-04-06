// import Joi from 'joi';

// const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/g;
// const PHONE_REGEX = /\d{10,11}/g;
// const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/g;

// export const userSchema = Joi.object({
//     name: Joi.string().max(50).required,
//     phone: Joi.string().pattern(PHONE_REGEX).required,
//     address: Joi.string().allow(null),
//     email: Joi.string().pattern(EMAIL_REGEX).required,
//     password: Joi.string().pattern(PASSWORD_REGEX).required,
// });

// export function validateRegiter
