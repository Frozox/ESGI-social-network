const { User } = require("../models/postgres");
const { ValidationError } = require("sequelize");
const { createToken } = require("../lib/jwt");

module.exports = {
    getUsers: async (req, res) => {
        try {
            const users = await User.findAll({ where: req.query });
            res.json(users);
        } catch (error) {
            res.sendStatus(500);
            console.error(error);
        }
    },
    getUserById: async (req, res) => {
        try {
            const user = await User.findByPk(req.params.id);
            if (!user) {
                res.sendStatus(404);
            } else {
                res.json(user);
            }
        } catch (error) {
            res.sendStatus(500);
            console.error(error);
        }
    },
    createUser: async (req, res) => {
        try {
            const user = await User.create(req.body);
            res.status(201).json(user);
        } catch (error) {
            console.log(error);
            //console.log(res);
            if (error instanceof ValidationError) {
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
    editUser: async (req, res) => {
        try {
            const result = await User.update(req.body, {
                where: { id: req.params.id },
                returning: true,
                individualHooks: true,
            });
            const [, lines] = result;
            if (!lines[0]) {
                res.sendStatus(404);
            } else {
                res.json(lines[0]);
            }
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
    deleteUser: async (req, res) => {
        try {
            const nbLine = await User.destroy({ where: { id: req.params.id } });
            if (!nbLine) {
                res.sendStatus(404);
            } else {
                res.sendStatus(204);
            }
        } catch (error) {
            res.sendStatus(500);
            console.error(error);
        }
    },
    loginUser: async (req, res) => {
        try {
            const user = await User.findOne({ where: { email: req.body.email } });
            if (!user) {
                return res.status(401).json({
                    email: "Email not found",
                });
            }
            if (user.password !== req.body.password) {
                return res.status(401).json({
                    password: "Password is incorrect",
                });
            }
            res.json({
                token: createToken(user),
            });
        } catch (error) {
            res.sendStatus(500);
            console.error(error);
        }
    },
    addFriend: async (req, res) => {
    }
}
