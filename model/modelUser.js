const moogoose = require('mongoose');

const modelUser = moogoose.Schema({
    _id: {
        type: String,
        require: true
    },
    username: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    role: {
        type: String,
        require: true
    }
})



module.exports = moogoose.model('user', modelUser);