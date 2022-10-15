const express = require('express');
const routerProduct = express.Router();
const controllerProduct = require('../controller/controllerProduct');
const validateProduct = require('../validate/validateProduct');
const csrf = require('csurf');
const crfsProtection = csrf();

routerProduct.get('/list-product', controllerProduct.listProduct);
routerProduct.get('/top-product', crfsProtection, controllerProduct.TopProduct)
routerProduct.get('/category-product', controllerProduct.categoryProduct);
routerProduct.get('/detail-product', crfsProtection, controllerProduct.detailProduct)
routerProduct.post('/add-product', validateProduct.validatePro.validateProduct, controllerProduct.addProduct);
routerProduct.post('/edit-product', validateProduct.validatePro.validateProduct, controllerProduct.editProduct);
routerProduct.post('/delete-product', controllerProduct.deleteProduct);



exports.routerProduct = routerProduct;