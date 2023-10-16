import Joi from 'joi';

const id = Joi.number();
const description = Joi.string().min(3).max(150);

export const createThemeSchema = Joi.object({
  description: description.required()
});

export const updateThemeSchema = Joi.object({
  id,
  description
});

export const getThemeSchema = Joi.object({
  id: id.required()
});
