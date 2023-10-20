const { Model, DataTypes, Sequelize } = require('sequelize');
const { THEME_TABLE } = require('./themes.model.cjs');

const QUESTION_TABLE = 'questions';

const QuestionSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  description: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true
  },
  title: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true
  },
  themeId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    unique: false,
    references: {
      model: THEME_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  nextQuestion: {
    allowNull: true,
    type: DataTypes.INTEGER,
    references: {
      model: QUESTION_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  isText: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
    unique: false
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'createdAt',
    defaultValue: Sequelize.NOW
  },
  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'updatedAt',
    defaultValue: Sequelize.NOW
  }

};
class Question extends Model {
  static associate (models) {
    this.belongsTo(models.Theme, {
      as: 'questions'
    });
    this.hasOne(models.Question, {
      as: 'prevQuestion'
    });
  }

  static config (sequelize) {
    return {
      sequelize,
      tableName: QUESTION_TABLE,
      modelName: 'Question',
      timestamps: false
    };
  }
}
module.exports = { QUESTION_TABLE, Question, QuestionSchema };
