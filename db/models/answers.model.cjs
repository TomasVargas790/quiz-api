const { Model, DataTypes, Sequelize } = require('sequelize');
const { QUESTION_TABLE } = require('./questions.model.cjs');

const ANSWER_TABLE = 'answers';

const AnswerSchema = {
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
  questionId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: QUESTION_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  nextQuestion: {
    allowNull: true,
    type: DataTypes.INTEGER,
    unique: false,
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
class Answer extends Model {
  static associate (models) {
    /*     this.belongsTo(models.Question, {
      as: 'fromQuestion'
    }); */
    /* this.hasOne(models.Question, {
      as: 'nextQuestion'
    }); */
  }

  static config (sequelize) {
    return {
      sequelize,
      tableName: ANSWER_TABLE,
      modelName: 'Answer',
      timestamps: false
    };
  }
}
module.exports = { ANSWER_TABLE, Answer, AnswerSchema };
