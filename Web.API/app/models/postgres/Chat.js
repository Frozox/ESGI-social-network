const { Model, DataTypes } = require("sequelize");
const connection = require("./db"); // connection is the connection to the POSTGRES database

class Chat extends Model {}

Chat.init(
  {
    userDest: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unsigned: true,
      validate: {
        isInt: true,
      }
    },
    userSrc: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unsigned: true,
      validate: {
        isInt: true,
      }
    },
    explicit: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      validate: {
        isBoolean: true,
      }
    },
    sendAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      validate: {
        isDate: true,
      }
    },
    receivedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
      validate: {
        isDate: true,
      }
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      validate: {
        isDate: true,
      }
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
      validate: {
        isDate: true,
      }
    }
  },
  {
    timestamps: false,
    sequelize: connection,
    modelName: "chat",
  }
);

module.exports = Chat;