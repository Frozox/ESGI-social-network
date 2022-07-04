const { Chat } = require('../models/postgres');
module.exports = {
  getChatMessages: async (req, res) => {
    try {
      const result = await Chat.findAll({
        where: {
          userSrc: 2,
          userDest: 1,
        }
      });
      console.log("result",result);
      res.json(result);
    } catch (error) {
      res.sendStatus(500);
      console.error(error);
    }
  }
}