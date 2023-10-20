import Joi from 'joi';

const id = Joi.number();
const description = Joi.string().min(3).max(150);
const title = Joi.string().min(3).max(150);
const themeId = Joi.number();
const isText = Joi.boolean();
const nextQuestion = Joi.number();
const questionId = Joi.number();

export const createAnswerSchema = Joi.object({
  description: description.required(),
  title: title.required(),
  themeId: themeId.required(),
  isText: isText.required(),
  nextQuestion: nextQuestion.required(),
  questionId: nextQuestion.required()
});

export const updateAnswerSchema = Joi.object({
  id,
  description,
  title,
  themeId,
  isText,
  nextQuestion,
  questionId
});

export const getAnswerSchema = Joi.object({
  id: id.required()
});
