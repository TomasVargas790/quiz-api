'use strict';

const { THEME_TABLE, ThemeSchema } = require('../models/themes.model.cjs');
const { USER_TABLE, UserSchema } = require('../models/users.model.cjs');
const { DESCRIPTION_TABLE, DescriptionSchema } = require('../models/descriptions.model.cjs');
const { QUESTION_TABLE, QuestionSchema } = require('../models/questions.model.cjs');
const { ANSWER_TABLE, AnswerSchema } = require('../models/answers.model.cjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(USER_TABLE, UserSchema);
    await queryInterface.createTable(THEME_TABLE, ThemeSchema);
    await queryInterface.createTable(DESCRIPTION_TABLE, DescriptionSchema);
    await queryInterface.createTable(QUESTION_TABLE, QuestionSchema);
    await queryInterface.createTable(ANSWER_TABLE, AnswerSchema);
  },

  async down (queryInterface) {
    await queryInterface.dropTable(USER_TABLE);
    await queryInterface.dropTable(DESCRIPTION_TABLE);
    await queryInterface.dropTable(ANSWER_TABLE);
    await queryInterface.dropTable(QUESTION_TABLE);
    await queryInterface.dropTable(THEME_TABLE);
  }
};
