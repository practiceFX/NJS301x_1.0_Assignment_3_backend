const mongoose = require('mongoose');


const modelCartOrder = mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        ref: 'user',
        require: true
    },
    inforProduct: [{
        idProduct: {
            type: String,
            ref: 'product',
            require: true
        },
        amount: {
            type: String,
            require: true
        },
        img: {
            type: String,
            require: true
        },
        name: {
            type: String,
            required: true
        },
        price: {
            type: String,
            required: true
        }
    }],
    fullName: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    phoneNumber: {
        type: String,
        require: true
    },
    address: {
        type: String,
        require: true
    },
    totalPrice: {
        type: String,
        require: true
    },
    dayOrder: {
        type: String,
        require: true
    },
    dayRecipt: {
        type: String
    }
})

module.exports = mongoose.model('cart_order', modelCartOrder)