const { Model, DataTypes, Sequelize } = require('sequelize');
const { THEME_TABLE } = require('./themes.model.cjs');

const QUESTION_TABLE = 'questions';

console.log(THEME_TABLE);

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
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'themes',
      key: 'id'
    }
  },
  nextQuestion: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'questions',
      key: 'id'
    }
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
      as: 'theme'
    });
    this.belongsToMany(models.Question, {
      as: 'prevQuestion',
      through: models.Question,
      foreignKey: 'nextQuestion',
      otherKey: 'id'

    });
    this.hasOne(models.Question, {
      sourceKey: 'nextQuestion',
      as: 'nextQuestionRef',
      foreignKey: 'id'
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
