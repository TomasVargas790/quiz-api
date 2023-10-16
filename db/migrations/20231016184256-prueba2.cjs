'use strict';

const { THEME_TABLE, ThemeSchema } = require('../models/themes.model.cjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(THEME_TABLE, ThemeSchema);
  },

  async down (queryInterface) {
    await queryInterface.dropTable(THEME_TABLE);
  }
};
