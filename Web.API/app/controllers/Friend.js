const { Friend, User } = require("../models/postgres");
const { ValidationError, Op } = require("sequelize");
const Logger = require('../services/Logger');

module.exports = {
    addFriend: async (req, res) => {
        try {
            const user = await Friend.create(req.body); // check if request already exists in user_src or user_dest
            res.status(201).json(user);
        } catch (error) {
            Logger.err(error);
            if (error instanceof ValidationError) {
                res.status(422).json({
                    quantity: "must be greather than 0",
                    title: "must not be empty",
                });
            } else {
                res.sendStatus(500);
            }
        }
    },
    getMyFriends: async (req, res) => {
        try {
            const friend = await Friend.findAll({
                where: {
                    [Op.or]: [
                        { user_dest: { [Op.eq]: req.params.id } },
                        { user_src: { [Op.eq]: req.params.id } },
                    ],
                    active: { [Op.eq]: true }
                },
                include: [
                    { model: User, as: "send" },
                    { model: User, as: "receive" },
                ],
            });
            res.json(friend);
        } catch (error) {
            Logger.err(error);
            res.sendStatus(500);
        }
    },
    editFriend: async (req, res) => {
        try {
            const result = await Friend.update(req.body, {
                where: { id: req.params.id },
            });
            res.json(result);
        } catch (error) {
            Logger.err(error);
            if (error instanceof ValidationError) {
                res.status(422).json({
                    quantity: "must be greather than 0",
                    title: "must not be empty",
                });
            } else {
                res.sendStatus(500);
            }
        }
    },
    getFriendsRequest: async (req, res) => {
        try {
            const friend = await Friend.findAll({
                where: {
                    [Op.or]: [
                        { user_dest: { [Op.eq]: req.params.id } },
                    ],
                    active: { [Op.eq]: false }
                },
                include: [
                    { model: User, as: "send" },
                ],
            });
            res.json(friend);
        } catch (error) {
            Logger.err(error);
            res.sendStatus(500);
        }
    },
    checkIfRequestIsSent: async (req, res) => {
        try {
            const friend = await Friend.findAll({
                where: {
                    [Op.or]: [
                        { user_src: { [Op.eq]: req.params.id } },
                    ],
                    active: { [Op.eq]: false }
                },
                include: [
                    { model: User, as: "receive" },
                ],
            });
            res.json(friend);
        } catch (error) {
            Logger.err(error);
            res.sendStatus(500);
        }
    },
    acceptFriendRequest: async (req, res) => {
        try {
            const result = await Friend.update({ active: true }, {
                where: {
                    user_dest: req.params.destId,
                    user_src: req.params.srcId,
                },
            });
            res.json(result);
        } catch (error) {
            Logger.err(error);
            res.sendStatus(500);
        }
    },
    refuseFriendRequest: async (req, res) => {
        try {
            const result = await Friend.destroy({
                where: {
                    user_dest: req.params.destId,
                    user_src: req.params.srcId,
                },
            });
            res.json(result);
        } catch (error) {
            Logger.err(error);
            res.sendStatus(500);
        }
    }
};