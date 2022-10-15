const { check, body } = require('express-validator');
const modelUser = require('../model/modelUser');

const validateRegister = [
    check('username').notEmpty(),
    body('username').isEmail().normalizeEmail(),
    // body('username').custom((value, { req }) => {
    //     modelUser.findOne({
    //         'username': req.body.username
    //     }).then(result => {
    //         return Promise.reject('Username is already in use')
    //     })
    // })
]

const validateLogin = [
    check('username').notEmpty(),
    body('username').isEmail().normalizeEmail(),
    body('password', 'Password must not Empty').notEmpty()
]

const validateUser = {
    validateRegister: validateRegister,
    validateLogin: validateLogin
}

module.exports = { validateUser }