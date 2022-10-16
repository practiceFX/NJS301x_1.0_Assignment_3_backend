const express = require('express');
const routerChat = express.Router();

const controllerChat = require('../controller/controllerChat');

routerChat.get('/chat', controllerChat.getChat);
routerChat.post('/insert-client', controllerChat.insertChatClient);
routerChat.post('/insert-staff', controllerChat.insertChatStaff);
routerChat.post('/new-chat', controllerChat.newChat);
routerChat.get('/new-chat/sucessfull', controllerChat.getnewChat);

exports.routerChat = routerChat;