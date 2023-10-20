'use strict';

const { ANSWER_TABLE, AnswerSchema } = require('../models/answers.model.cjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(ANSWER_TABLE, AnswerSchema);
  },

  async down (queryInterface) {
    await queryInterface.dropTable(ANSWER_TABLE);
  }
};
