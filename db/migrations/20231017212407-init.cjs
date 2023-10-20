'use strict';

const { QUESTION_TABLE, QuestionSchema } = require('../models/questions.model.cjs');
const { ANSWER_TABLE, AnswerSchema } = require('../models/answers.model.cjs');
const { USER_TABLE, UserSchema } = require('../models/users.model.cjs');
const { Sequelize } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(QUESTION_TABLE, QuestionSchema);
  },

  async down (queryInterface) {
    await queryInterface.dropTable(QUESTION_TABLE);
  }
};
