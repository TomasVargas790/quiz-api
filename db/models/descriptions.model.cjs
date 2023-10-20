const { Model, DataTypes, Sequelize } = require('sequelize');
const { THEME_TABLE } = require('./themes.model.cjs');

const DESCRIPTION_TABLE = 'descriptions';

const DescriptionSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  title: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true
  },
  description: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true
  },
  themeId: {
    type: DataTypes.INTEGER,
    references: {
      model: THEME_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
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
class Description extends Model {
  static associate (models) {
    this.belongsTo(models.Theme, {
      as: 'theme'
    });
  }

  static config (sequelize) {
    return {
      sequelize,
      tableName: DESCRIPTION_TABLE,
      modelName: 'Description',
      timestamps: false
    };
  }
}
module.exports = { DESCRIPTION_TABLE, Description, DescriptionSchema };
