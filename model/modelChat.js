const mongoose = require('mongoose');

const modelChat = mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    chat: [
        {
            _id: false,
            client: {
                type: String
            },
            staff: {
                type: String
            }
        }
    ]
})


module.exports = mongoose.model('chat', modelChat);
