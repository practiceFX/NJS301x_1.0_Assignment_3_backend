const express = require('express');
const routerUser = express.Router();
const validateUser = require('../validate/validateUser');
const controllerUser = require('../controller/controllerUser');



routerUser.get('/list-user', controllerUser.listUser);
routerUser.post('/register-user', validateUser.validateUser.validateRegister, controllerUser.registerUser);
routerUser.post('/login', validateUser.validateUser.validateLogin, controllerUser.loginUser);
routerUser.post('/logout/successfull', controllerUser.getLogout);
routerUser.post('/logout', controllerUser.postLogout);
routerUser.get('/login/sucessfull', controllerUser.getLoginUser);
routerUser.get('/login/error', controllerUser.getIsAuth);
routerUser.post('/edit-user', controllerUser.editUser);
routerUser.post('/delete-user', controllerUser.deleteUser);

exports.routerUser = routerUser;

