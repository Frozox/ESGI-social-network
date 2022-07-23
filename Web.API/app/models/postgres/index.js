exports.connection = require("./db");
const User = require("./User");
const Chat = require("./Chat");
const Friend = require("./Friend");

Chat.belongsTo(User, { foreignKey: "userSrc", as: "sender" });
Chat.belongsTo(User, { foreignKey: "userDest", as: "receiver" });

Friend.belongsTo(User, { foreignKey: "user_src", as: "send" });
Friend.belongsTo(User, { foreignKey: "user_dest", as: "receive" });
User.hasMany(Friend, { foreignKey: "user_src", as: "userList" });

exports.User = User;
exports.Chat = Chat;
exports.Friend = Friend;