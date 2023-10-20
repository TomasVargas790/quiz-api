const { Model, DataTypes, Sequelize } = require('sequelize');

const THEME_TABLE = 'themes';

const ThemeSchema = {
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
class Theme extends Model {
  static associate (models) {
    this.hasMany(models.Description, {
      as: 'descriptions',
      foreignKey: 'themeId'
    });
  }

  static config (sequelize) {
    return {
      sequelize,
      tableName: THEME_TABLE,
      modelName: 'Theme',
      timestamps: false
    };
  }
}
module.exports = { THEME_TABLE, Theme, ThemeSchema };
