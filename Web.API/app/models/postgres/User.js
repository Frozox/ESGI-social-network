const { Model, DataTypes } = require("sequelize");
const connection = require("./db");
const bcryptjs = require("bcryptjs");
const Chat = require("./Chat");

class User extends Model { }

User.init(
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
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
    },
    preferedLanguages: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    }
  },
  {
    indexes: [{ fields: ['email'], unique: true }],
    sequelize: connection,
    modelName: 'user',
    tableName: 'users',
  }
);

User.addHook("beforeCreate", async (user) => {
  user.password = await bcryptjs.hash(user.password, await bcryptjs.genSalt());
});

User.addHook("beforeUpdate", async (user, { fields }) => {
  if (fields.includes("password")) {
    user.password = await bcryptjs.hash(
      user.password,
      await bcryptjs.genSalt()
    );
  }
});

module.exports = User;
