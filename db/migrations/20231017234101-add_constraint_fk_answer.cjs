'use strict';

const { Sequelize ,DataTypes} = require('sequelize');
const { ANSWER_TABLE } = require('../models/answers.model.cjs');
const { QUESTION_TABLE } = require('../models/questions.model.cjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.addColumn(ANSWER_TABLE, 'question',{
      type:DataTypes.INTEGER,
      allowNull:false,
      references:{
       model:QUESTION_TABLE,
       key:'id' 
      }
    });
    await queryInterface.addColumn(ANSWER_TABLE, 'nextQuestion',{
      type:DataTypes.INTEGER,
      allowNull:false,
      references:{
       model:QUESTION_TABLE,
       key:'id' 
      }
    });
  },

  async down (queryInterface) {
    await queryInterface.removeColumn(ANSWER_TABLE,'question');
    await queryInterface.removeColumn(ANSWER_TABLE,'nextQuestion');
  }
};
