import Joi from 'joi';

const id = Joi.number();
const description = Joi.string().min(3).max(150);
const title = Joi.string().min(3).max(150);
const themeId = Joi.number();
const isText = Joi.boolean();
const nextQuestion = Joi.number().optional();

export const createQuestionSchema = Joi.object({
  description: description.required(),
  title: title.required(),
  themeId: themeId.required(),
  isText: isText.required(),
  nextQuestion
});

export const updateQuestionSchema = Joi.object({
  id,
  description,
  title,
  themeId,
  isText,
  nextQuestion
});

export const getQuestionSchema = Joi.object({
  id: id.required()
});
