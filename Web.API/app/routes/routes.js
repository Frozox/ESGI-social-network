const express = require('express');
const router = new express.Router;

const HttpCode = require('../controllers/HttpCode');
const User = require('../controllers/User');
const Chat = require('../controllers/Chat');
const Friend = require('../controllers/Friend');
const Log = require('../controllers/Log');

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
router.get('/users/:mail', User.getUserByMail);
router.get('/me/:id', User.getUsersExceptMe);
router.post('/register', User.createUser);
router.put('/users/:id', User.editUser);
router.delete('/users/:id', User.deleteUser);
router.post("/login", User.loginUser);

// Chat Routes
router.get('/chatMessages', Chat.getChatMessages);
router.get('/chatMessages/lastConversations', Chat.getLastConversations);
router.get('/chatMessages/last', Chat.getLastChatMessage);
router.get('/chatMessages/:id', Chat.getChatMessageById);
router.post('/chatMessages', Chat.createChatMessage);
router.put('/chatMessages/:id', Chat.editChatMessage);
router.delete('/chatMessages/:id', Chat.deleteChatMessage);

// Friend Routes
router.post("/friends", Friend.addFriend);
router.get("/friend/:id", Friend.getMyFriends);
router.put("/friend/:id", Friend.editFriend);
router.get("/friend_request/:id", Friend.getFriendsRequest);
router.get("/request_sent/:id", Friend.checkIfRequestIsSent);
router.put("/accept_request/:srcId/:destId", Friend.acceptFriendRequest);
router.delete("/refuse_request/:srcId/:destId", Friend.refuseFriendRequest);

// Logs Routes
router.get('/logs', Log.getLogs);
router.get('/logs/:id', Log.getLogById);
router.post('/logs', Log.createLog);

module.exports = router;