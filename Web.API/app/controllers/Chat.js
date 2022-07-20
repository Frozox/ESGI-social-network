const { Chat, User} = require('../models/postgres');
const { messageChat } = require('../models/mongo');

module.exports = {
  /**
   * @description - This method is used to find all messages between two users
   * @param req
   * @param res
   * @returns {Promise<void>}
   */
  getChatMessages: async (req, res) => {
    console.log(req)
    try {
      const result = await Chat.findAll({
        where: {...req.body.params},
        include: [
          { model: User, as: 'sender' },
          { model: User, as: 'receiver' }
        ]
      });
      res.json(result);
    } catch (error) {
      res.sendStatus(500);
      console.error(error);
    }
  },

  /**
   * @description - This method is used to retrieve one message by his Id
   * @param req
   * @param res
   * @returns {Promise<void>}
   */
  getChatMessageById: async (req, res) => {
    try {
      const resultPostgres = await Chat.findOne({ where: { id: req.params.id } });
      const resultMongo = await messageChat.findOne({ idPostgres: req.params.id });
      console.log(resultPostgres);
      console.log(resultMongo);
      if (resultPostgres && resultMongo) {
          res.json({
              postgres: resultPostgres,
              mongo: resultMongo.content
          });
      }else{
          res.sendStatus(404);
      }
    } catch (error) {
      res.sendStatus(500);
      console.error(error);
    }
  },

  /**
   * @description - This method is used to create a new message
   * @param req
   * @param res
   * @returns {Promise<void>}
   */
  createChatMessage: async (req, res) => {
    try {
      const resultPostgres = await Chat.create(req.body.postgres);
      if (resultPostgres && resultPostgres.id) {
        req.body.mongo.idPostgres = resultPostgres.id;
        const resultMongo = await messageChat.create(req.body.mongo);
        const result = {
          postgres: resultPostgres,
          mongo: resultMongo.content
        }
        res.json(result);
      }
    } catch (error) {
      res.sendStatus(500);
      console.error(error);
    }
  },

  /**
   * @description - This method is used to update a message
   * @param req
   * @param res
   * @returns {Promise<void>}
   */
  editChatMessage: async (req, res) => {
    try {
      const updateMongo = await messageChat.updateOne(req.body, {where: {idPostgres: req.params.id}}, {returning: true});
      const updatePostgres = await Chat.updateOne({updatedAt: new Date()}, {where: {id: req.params.id}}, {returning: true});
      res.json({
        postgres: updatePostgres,
        mongo: updateMongo.content,
      });
    } catch (error) {
      res.sendStatus(500);
      console.error(error);
    }
  },

  /**
   * @description - This method is used to delete a message
   * @param req
   * @param res
   * @returns {Promise<void>}
   */
  deleteChatMessage: async (req, res) => {
    try {
      const result = await Chat.update({deletedAt: new Date()}, {
        where: {
          id: req.params.id,
        }
      });
      res.json(result);
    } catch (error) {
      res.sendStatus(500);
      console.error(error);
    }
  }
}