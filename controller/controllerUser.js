const mongoose = require('mongoose');
const modelUser = require('../model/modelUser');
const { validationResult } = require('express-validator');
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');
const bcrypt = require('bcryptjs');


// const transporter = nodemailer.createTransport(
//     sendgridTransport({
//         auth: {
//             api_key: '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'
//         }
//     })
// )




exports.listUser = (req, res, next) => {
    modelUser.find().then(result => {
        res.send(result)
    }).catch(err => {
        res.status(err.status);
    })
}


exports.editUser = (req, res, next) => {
    let _id = req.body._id;

    modelUser.findOne({
        '_id': _id
    }).then(result => {
        result.username = req.body.username;
        result.password = req.body.password;
        result.isAdmin = req.body.isAdmin;
        return result.save();
    }).then(respon => {
        res.status(200)
    }).then(err => {
        res.status(err.status)
    })
}

exports.deleteUser = (req, res, next) => {
    let _id = req.body._id;
    modelUser.deleteOne({ '_id': _id }, (err) => {
        !err ? res.status(200) : res.status(err.status)
    })
}




exports.registerUser = (req, res, next) => {
    let username = req.body.username;
    let password = req.body.password;
    let retypePassword = req.body.retypePassword;
    let error = validationResult(req);
    if (!error.isEmpty() || password != retypePassword) {
        res.status(422);
        res.redirect('/signup/error?username=' + username + '&password=' + password + '&retypePassword=' + retypePassword);
    }
    bcrypt.hash(password, 12).then(hashPassword => {
        const newUser = new modelUser({
            _id: String(new mongoose.Types.ObjectId),
            username: username,
            password: hashPassword
        });
        // transporter.sendMail({
        //     to: username,
        //     from: 'postApp',
        //     subject: 'Sign up succeeded !!!',
        //     html: '<h1>You sucessfully signed up !</h1>'
        // })
        return newUser.save();
    }).then(result => {
        res.status(200)
        console.log('Sucessfull')
    }).catch(err => {
        res.status(err.status)
        console.log(err)
    })
}

exports.getRegisterUser = (req, res, next) => {
    res.send('Register Successful !!!')
}



exports.loginUser = (req, res, next) => {
    let username = req.body.username;
    let password = req.body.password;
    let error = validationResult(req);

    if (!error.isEmpty()) {
        res.status(422);
    }
    modelUser.find({ 'username': username }).then(user => {
        if (!user) {
            res.redirect('/login/error?username=' + username +
                '&password=' + password);
        } else {

            bcrypt.compare(password, user[0].password).then(doMatch => {
                if (doMatch) {
                    req.session.isLogined = true;
                    req.session.user = user;
                    res.status(200)
                    return req.session.save(err => {
                        if (err) {
                            res.status(404)
                        } else {
                            res.status(200)
                            res.redirect('/login/sucessfull');
                        }

                    })
                }
            })
        }
    })
}



exports.getLoginUser = (req, res, next) => {
    // console.log(req.session)
    res.send(req.session);
}



exports.getLoginError = (req, res, next) => {
    const username = req.query.username;
    const password = req.query.password;
    res.send({
        oldInput: {
            username: username,
            password: password
        }
    })
}


exports.getIsAuth = (req, res, next) => {
    res.send('error');
}


exports.postLogout = (req, res, next) => {
    req.session.destroy(err => {
        if (err) {
            console.log(err);
        }
        else {
            res.redirect('/logout/successfull');
        }
    });
}



exports.getLogout = (req, res, next) => {
    res.send('Logout sucessful');
}
