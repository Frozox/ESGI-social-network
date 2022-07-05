const { Model, DataTypes } = require("sequelize");
const connection = require("./db");

class Friend     extends Model {}

Friend.init(
  {
    user_src: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    user_dest: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    invite_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    confirmed_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    }
  },
  {
    sequelize: connection,
    modelName: 'friend',
    tableName: 'friends',
  }
);

module.exports = Friend;
