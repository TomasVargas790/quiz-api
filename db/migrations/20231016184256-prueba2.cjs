'use strict';

const { THEME_TABLE, ThemeSchema } = require('../models/themes.model.cjs');
const { DESCRIPTION_TABLE, DescriptionSchema } = require('../models/descriptions.model.cjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(THEME_TABLE, ThemeSchema);
    await queryInterface.createTable(DESCRIPTION_TABLE, DescriptionSchema);
  },

  async down (queryInterface) {
    await queryInterface.dropTable(THEME_TABLE);
    await queryInterface.dropTable(DESCRIPTION_TABLE);
  }
};
