const { Model, DataTypes, Sequelize } = require('sequelize');

const USER_TABLE = 'users';

const UserSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  email: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true
  },
  password: {
    allowNull: false,
    type: DataTypes.TEXT,
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
class User extends Model {
  static associate (models) { }

  static config (sequelize) {
    return {
      sequelize,
      tableName: USER_TABLE,
      modelName: 'User',
      timestamps: false
    };
  }
}
module.exports = { USER_TABLE, User, UserSchema };
