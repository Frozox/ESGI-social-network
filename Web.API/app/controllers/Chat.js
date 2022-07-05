const { Chat } = require('../models/postgres');
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
        where: {...req.body.params}
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
      const result = await Chat.findOne({
        where: {id: req.params.id}
      });
      res.json(result);
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
      const result = await Chat.create(req.body);
      res.status(201).json(result);
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
      const result = await Chat.update(req.body, {
        where: {id: req.params.id}
      });
      res.json(result);
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