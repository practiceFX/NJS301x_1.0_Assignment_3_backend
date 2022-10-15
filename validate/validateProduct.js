const { check } = require('express-validator');



const validateProduct = [
    check('category', 'Not Empty').notEmpty(),
    check('img1', 'Not Empty').notEmpty(),
    check('img2', 'Not Empty').notEmpty(),
    check('img3', 'Not Empty').notEmpty(),
    check('img4', 'Not Empty').notEmpty(),
    check('long_desc', 'Not Empty').notEmpty(),
    check('name', 'Not Empty').notEmpty(),
    check('price', 'Price must be Number').isFloat(),
    check('short_desc', 'Not Empty').notEmpty()
]



let validatePro = {
    validateProduct: validateProduct
}

module.exports = { validatePro }