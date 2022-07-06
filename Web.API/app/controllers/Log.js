const { Log } = require("../models/mongo");
const mongoose = require("mongoose");
const Logger = require("../services/Logger");

module.exports = {
  getLogs: async (req, res) => {
    try {
      const { page = 1, perPage = 10, ...criteria } = req.query;
      const result = await Log.find(criteria)
        .limit(perPage)
        .skip((page - 1) * perPage);
      res.json(result);
    } catch (error) {
      Logger.err(error.message);
      res.sendStatus(500);
    }
  },
  getLogById: async (req, res) => {
    try {
      const result = await Log.findOne({
        _id: req.params.id,
      });
      if (!result) {
        res.sendStatus(404);
      } else {
        res.json(result);
      }
    } catch (error) {
      Logger.err(error.message);
      res.sendStatus(500);
    }
  },
  createLog: async (req, res) => {
    try {
      const storedLog = await Logger.fromSeverity(
        req.body.message,
        parseInt(req.body.severity),
        false
      );
      res.status(201).json(storedLog);
    } catch (error) {
      if (error instanceof mongoose.Error.ValidationError) {
        res.status(422).json(formatError(error));
      } else {
        Logger.err(error.message);
        res.sendStatus(500);
      }
    }
  },
};
