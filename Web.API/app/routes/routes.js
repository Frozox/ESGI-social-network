const express = require('express');
const router = new express.Router;

const HttpCode = require('../controllers/HttpCode');
const User = require('../controllers/User');

router.get('/', (_, res) => res.send("hey API works !"));

// HttpCode Routes
router.get('/httpCodes', HttpCode.getHttpCodes);
router.get('/httpCodes/:id', HttpCode.getHttpCodeById);
router.post('/httpCodes', HttpCode.createHttpCode);
router.put('/httpCodes/:id', HttpCode.editHttpCode);
router.delete('/httpCodes/:id', HttpCode.deleteHttpCode);

// User Routes
router.get('/users', User.getUsers);
router.get('/users/:id', User.getUserById);
router.post('/users', User.createUser);
router.put('/users/:id', User.editUser);
router.delete('/users/:id', User.deleteUser);

module.exports = router;