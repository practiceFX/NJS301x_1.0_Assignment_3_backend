const modelCartOrder = require("../model/modelCartOrder");
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');
const { mailmodel } = require("../utils/mail");


const transporter = nodemailer.createTransport(
    sendgridTransport({
        auth: {
            api_key: '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'
        }
    })
)


exports.cartOrder = (req, res, next) => {
    const newCartOrder = new modelCartOrder({
        _id: String(new mongoose.Types.ObjectId),
        user_id: req.body.user_id,
        inforProduct: req.body.inforProduct,
        fullname: req.body.fullname,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        address: req.body.address,
        totalPrice: req.body.totalPrice,
        dayOrder: new Date()
    })
    transporter.sendMail({
        to: 'ngockhanhbg97@gmail.com',
        from: 'khanhhnfx17419@funix.edu.vn',
        subject: 'Order Sucessfull !!!',
        html: mailmodel(
            req.body.fullname,
            req.body.phoneNumber,
            req.body.address,
            new Date(),
            req.body.inforProduct,
            req.body.totalPrice
        )
    }).then(respon => {
        console.log('Send mail sucessfull !!!')
    })
    newCartOrder.save().then(respon => {
        res.redirect('/cart-order/successfull');
    }).catch(err => { res.status(err.status) });

}



exports.getCartOrder = (req, res, next) => {
    res.send('Sucessfull !!!');
}



exports.historyOrder = (req, res, next) => {
    modelCartOrder.find({ 'user_id': req.query.id }).then(respon => {
        console.log(respon)
        res.send(respon);
    }).catch(
        err => {
            const error = new Error(err);
            return next(error);
        }
    )
}


exports.detailBill = (req, res, next) => {
    modelCartOrder.find({}).then(respon => {
        res.send(respon)
    }).catch(
        err => {
            const error = new Error(err);
            return next(error);
        }
    )
}