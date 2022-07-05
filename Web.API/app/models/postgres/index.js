exports.connection = require("./db");
const User = require("./User");
const Chat = require("./Chat");

Chat.belongsTo(User, { foreignKey: "userSrc", as: "sender" });
Chat.belongsTo(User, { foreignKey: "userDest", as: "receiver" });

exports.User = User;
exports.Chat = Chat;
