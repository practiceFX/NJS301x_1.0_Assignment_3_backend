const mongoose = require('mongoose');


const modelProduct = mongoose.Schema({
    _id: {
        type: String,
        require: true
    },
    category: {
        type: String,
        require: true
    },
    img1: {
        type: String
    },
    img2: {
        type: String
    },
    img3: {
        type: String
    },
    img4: {
        type: String
    },
    long_desc: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    price: {
        type: String
    },
    short_desc: {
        type: String,
        require: true
    }
})


module.exports = mongoose.model('product', modelProduct);