const express = require('express');

const routerCart = express.Router();
const controllerCart = require('../controller/controllerCart');
const isAuth = require('../middleware/isAuth');
const csrf = require('csurf');
const crfsProtection = csrf();


routerCart.post('/cart-order', isAuth, controllerCart.cartOrder);
routerCart.get('/cart-order/successfull', isAuth, controllerCart.getCartOrder);
routerCart.get('/history-cart', controllerCart.historyOrder);
routerCart.get('/detail-bill', controllerCart.detailBill);

exports.routerCart = routerCart;