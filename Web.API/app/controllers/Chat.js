const { Chat, User} = require('../models/postgres');
const { messageChat } = require('../models/mongo');
const {ValidationError, Op, Sequelize} = require("sequelize");
const { Logger } = require('../services/Logger');

const formatResults = (resultPostgres, resultMongo) => {
  return resultPostgres.map(item => {
    const result = resultMongo.find(itemMongo => itemMongo.idPostgres === item.id);
    if(result && result.content) {
      return {
        ...item.dataValues,
        content: result.content,
      }
    }
  });
}

module.exports = {
  /**
   * @description - This method is used to find all messages between two users
   * @param req
   * @param res
   * @returns {Promise<void>}
   */
  getChatMessages: async (req, res) => {
    try {
      const { userSrc, userDest } = req.query;
      const resultPostgres = await Chat.findAll({
        where: {
          [Op.or]: [
            {userDest: userSrc, userSrc: userDest},
            {userDest: userDest, userSrc: userSrc}
          ]
        },
        order: [
          ['sendAt', 'ASC']
        ],
        distinct: true,
        include: [
          { model: User, as: 'sender' },
          { model: User, as: 'receiver' }
        ]
      });
      if (resultPostgres.length > 0) {
        const resultMongo = await messageChat.find({
          idPostgres: {$in: resultPostgres.map(item => item.id)}
        });
        const formattedResult = formatResults(resultPostgres, resultMongo);
        res.status(200).json(formattedResult);
      }else{
        res.status(200).json({
          message: 'No messages found',
          data: []
        });
      }
    } catch (error) {
      res.sendStatus(500);
      Logger.err(error);
    }
  },


  getLastConversations: async (req, res) => {
    try {
      const { userId } = req.query;
      const resultPostgres = await Chat.findAll({
        attributes: [
            Sequelize.literal('DISTINCT ON ("userDest", "userSrc") *'),
            'id', 'userSrc', 'userDest', 'sendAt', 'receivedAt', 'updatedAt', 'deletedAt'
        ],
        where: {
          [Op.or]: [
            {userDest: userId},
            {userSrc: userId}
          ],
        },
        order: [
          'userSrc',
          'userDest',
          ['sendAt', 'DESC']
        ],
        distinct: ['userSrc', 'userDest'],
        include: [
          { model: User, as: 'sender' },
          { model: User, as: 'receiver' }
        ]
      });
      if (resultPostgres.length > 0) {
        const resultMongo = await messageChat.find({
          idPostgres: {$in: resultPostgres.map(item => item.id)}
        });
        const formattedResult = formatResults(resultPostgres, resultMongo);
        res.status(200).json(formattedResult);
      }else{
        res.status(200).json({
          message: 'No messages found',
          data: []
        });
      }
    }catch (error) {
      res.sendStatus(500);
      Logger.err(error);
    }
  },

  /**
   * @description - This method is used to find last message between two users
   * @param req
   * @param res
   * @returns {Promise<void>}
   */
  getLastChatMessage: async (req, res) => {
    try {
      const { userSrc, userDest } = req.query;
      const result = await Chat.findOne({
        where: {
          [Op.or]: [
            {userDest: userSrc, userSrc: userDest},
            {userDest: userDest, userSrc: userSrc}
          ]
        },
        order: [
            ['sendAt', 'ASC']
        ],
        include: [
          { model: User, as: 'sender' },
          { model: User, as: 'receiver' }
        ]
      });
      res.json(result);
    } catch (error) {
      res.sendStatus(500);
      Logger.err(error);
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
      if (resultPostgres && resultMongo) {
        resultPostgres.content = resultMongo.content;
        res.json(resultPostgres);
      }else{
        res.sendStatus(404);
      }
    } catch (error) {
      res.sendStatus(500);
      Logger.err(error);
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
        if (resultMongo && resultMongo.id) {
          resultPostgres.content = resultMongo.content;
          res.json(resultPostgres);
        }else{
          res.sendStatus(500);
          Logger.info("Erreur de création dans Mongo");
        }
      }
    } catch (error) {
      res.sendStatus(500);
      Logger.err(error);
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
      const updateMongo = await messageChat.updateOne({ idPostgres: req.params.id }, req.body.mongo);
      if (updateMongo.matchedCount === 0) {
        res.sendStatus(500);
        Logger.info("Erreur de mise à jour dans Mongo");
      }
      const updatePostgres = await Chat.update({updatedAt: new Date()}, {where: {id: req.params.id}, returning: true});
      if (updatePostgres.length === 0 || !updatePostgres[1]) {
        res.sendStatus(500);
        Logger.error("Erreur de mise à jour dans Postgres");
      }else{
        updatePostgres[1][0].setDataValue('content',req.body.mongo.content);
        res.json(updatePostgres[1][0]);
      }
    } catch (error) {
      res.sendStatus(500);
      Logger.err(error);
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
      Logger.err(error);
    }
  }
}