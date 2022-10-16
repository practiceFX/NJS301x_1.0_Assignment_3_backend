const modelChat = require('../model/modelChat');
const mongoose = require('mongoose');
const io = require('../socket');



exports.insertChatClient = (req, res, next) => {
    const id = req.body.id;
    const chatText = req.body.chat;
    modelChat.find({ '_id': id }).then(respon => {
        const chat = [...respon[0].chat, { client: chatText }];
        respon[0].chat = chat;
        return respon[0].save();
    }).then(respon => {
        io.getIO().emit('chat-client', { action: 'chat', chat: respon })
        res.status(200)
    }).
        catch(err => {
            console.error(err);
        })
}


exports.insertChatStaff = (req, res, next) => {
    const id = req.body.id;
    const chatText = req.body.chat;
    modelChat.find({ '_id': id }).then(respon => {
        const chat = [...respon[0].chat, { staff: chatText }];
        respon[0].chat = chat;
        return respon[0].save();
    }).then(respon => {
        io.getIO().emit('chat-staff', { action: 'chat', chat: respon })
        res.status(200)
    }).
        catch(err => {
            console.error(err);
        })
}


exports.getChat = (req, res, next) => {
    const id = req.query.id;
    modelChat.find({ '_id': id }).then(respon => {
        respon.send(respon);
    }).catch(err => {
        console.log(err)
    })
}

exports.newChat = (req, res, next) => {
    const id = String(new mongoose.Types.ObjectId);
    const newChat = new modelChat({
        _id: id,
        chat: []
    })
    newChat.save().then(respon => {
        res.redirect('/new-chat/sucessfull?id=' + id);
    }).catch(err => {
        console.log(err);
    })

}
exports.getnewChat = (req, res, next) => {
    res.send(req.query.id);
}