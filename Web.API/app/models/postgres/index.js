exports.connection = require("./db");
const User = require("./User");
const Friend = require("./Friend");

Friend.belongsTo(User, { foreignKey: "user_src", as: "send" });
Friend.belongsTo(User, { foreignKey: "user_dest", as: "receive" });
User.hasMany(Friend, { foreignKey: "user_src", as: "userList" });

exports.User = User;
exports.Friend = Friend;
exports.User = require("./User");
exports.Chat = require("./Chat");
