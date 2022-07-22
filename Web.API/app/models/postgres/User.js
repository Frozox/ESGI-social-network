const { Model, DataTypes } = require("sequelize");
const connection = require("./db");
const bcryptjs = require("bcryptjs");

class User extends Model { }

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
    },
    friendList: {
      type: DataTypes.ARRAY,
      allowNull: false,
    }
  },
  {
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
