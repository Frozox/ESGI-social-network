const { Model, DataTypes } = require("sequelize");
const connection = require("./db");

class User extends Model {}

User.init(
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
      },
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    sequelize: connection,
    modelName: 'user',
    tableName: 'users',
  }
);

module.exports = User;
