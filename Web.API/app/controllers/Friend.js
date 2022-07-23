const { Friend, User } = require("../models/postgres");
const { ValidationError, Op } = require("sequelize");

module.exports = {
    addFriend: async (req, res) => {
        try {
            console.log(req.body);
            const user = await Friend.create(req.body); // check if request already exists in user_src or user_dest
            res.status(201).json(user);
        } catch (error) {
            console.log(error);
            //console.log(res);
            if (error instanceof ValidationError) {
                console.log(error);
                res.status(422).json({
                    quantity: "must be greather than 0",
                    title: "must not be empty",
                });
            } else {
                res.sendStatus(500);
                console.error(error);
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
            console.log(friend);
            res.json(friend);
        } catch (error) {
            res.sendStatus(500);
            console.error(error);
        }
    },
    editFriend: async (req, res) => {
        try {
            const result = await Friend.update(req.body, {
                where: { id: req.params.id },
            });
            console.log(result);
            res.json(result);
        } catch (error) {
            if (error instanceof ValidationError) {
                console.error(error);
                res.status(422).json({
                    quantity: "must be greather than 0",
                    title: "must not be empty",
                });
            } else {
                res.sendStatus(500);
                console.error(error);
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
            console.log(friend);
            res.json(friend);
        } catch (error) {
            res.sendStatus(500);
            console.error(error);
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
            console.log(friend);
            res.json(friend);
        } catch (error) {
            res.sendStatus(500);
            console.error(error);
        }
    }
};