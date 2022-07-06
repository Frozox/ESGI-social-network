const { Friend } = require("../models/postgres");
const { ValidationError } = require("sequelize");

module.exports = {
    addFriend: async (req, res) => {
        try {
            console.log(req.body);
            const user = await Friend.create(req.body);
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
            const users = await Friend.findAll({ where: req.query });
            res.json(users);
        } catch (error) {
            res.sendStatus(500);
            console.error(error);
        }
    }
};