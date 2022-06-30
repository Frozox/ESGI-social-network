const { HttpCode } = require("../models/mongo");
const mongoose = require("mongoose");

const formatError = (validationError) => {
  return Object.keys(validationError.errors).reduce((acc, key) => {
    acc[key] = validationError.errors[key].message;
    return acc;
  }, {});
};

module.exports = {
    getHttpCodes: async (req, res) => {
        try {
            const { page = 1, perPage = 10, ...criteria } = req.query;
            const result = await HttpCode.find(criteria)
            .limit(perPage)
            .skip((page - 1) * perPage);
            res.json(result);
        } catch (error) {
            res.sendStatus(500);
            console.error(error);
        }
    },
    getHttpCodeById: async (req, res) => {
        try {
            const result = await HttpCode.findOne({
            _id: req.params.id,
            });
            if (!result) {
            res.sendStatus(404);
            } else {
            res.json(result);
            }
        } catch (error) {
            console.error(error);
            res.sendStatus(500);
        }
    },
    createHttpCode: async (req, res) => {
        try {
            const result = await HttpCode.create(req.body);
            res.status(201).json(result);
        } catch (error) {
            if (error instanceof mongoose.Error.ValidationError) {
            res.status(422).json(formatError(error));
            } else {
            res.sendStatus(500);
            console.error(error);
            }
        }
    },
    editHttpCode: async (req, res) => {
        try {
            const result = await HttpCode.findOneAndUpdate(
            {
                _id: req.params.id,
            },
            { $set: req.body }
            );
            if (!result) {
            res.sendStatus(404);
            } else {
            res.json(result);
            }
        } catch (error) {
            if (error instanceof mongoose.Error.ValidationError) {
            res.status(422).json(formatError(error));
            } else {
            res.sendStatus(500);
            console.error(error);
            }
        }
    },
    deleteHttpCode: async (req, res) => {
        try {
            const result = await HttpCode.findOneAndRemove({
            _id: req.params.id,
            });
            if (!result) {
            res.sendStatus(404);
            } else {
            res.sendStatus(204);
            }
        } catch (error) {
            res.sendStatus(500);
            console.error(error);
        }
    },
}

