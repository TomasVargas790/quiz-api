import Joi from 'joi';

const id = Joi.number();
const description = Joi.string().min(3).max(150);
const title = Joi.string().min(3).max(150);
const themeId = Joi.number();

export const createDescriptionSchema = Joi.object({
  description: description.required(),
  title: title.required(),
  themeId: themeId.required()
});

export const updateDescriptionSchema = Joi.object({
  id,
  description,
  title,
  themeId
});

export const getDescriptionSchema = Joi.object({
  id: id.required()
});
