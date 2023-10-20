'use strict';

const { DataTypes } = require('sequelize');
const { QUESTION_TABLE } = require('../models/questions.model.cjs');
const { THEME_TABLE } = require('../models/themes.model.cjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.addColumn(QUESTION_TABLE, 'themeId', {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: THEME_TABLE,
        key: 'id'
      }
    });
    await queryInterface.addColumn(QUESTION_TABLE, 'nextQuestion', {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: QUESTION_TABLE,
        key: 'id'
      }
    });
  },

  async down (queryInterface) {
    await queryInterface.removeColumn(QUESTION_TABLE, 'theme');
    await queryInterface.removeColumn(QUESTION_TABLE, 'nextQuestion');
  }
};
