import Joi from 'joi';

const email = Joi.string().email();
const password = Joi.string();

const createUserSchema = Joi.object({
  email: email.required(),
  password: password.required()
});

export { createUserSchema };
