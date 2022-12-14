const express = require('express');

const app = express();

const mongoose = require('mongoose');
const db = require('./db/db');
const cors = require('cors');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const multer = require('multer');

const server = app.listen(process.env.PORT || 8000);
const io = require('./socket').init(server);

// const csrf = require('csurf');
// const crfsProtection = csrf();



const store = new MongoDBStore({
    uri: db.url,
    databaseName: 'phone_shop',
    collection: 'sessions'
})



const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images')
    },
    filename: (req, file, cb) => {
        cb(null, file.filename + '-' + file.originalname)
    }
})

const fileFilter = (req, file, cb) => {
    if (file.mimetype == 'image/png' ||
        file.mimetype == 'image/jpg' ||
        file.mimetype == 'image/jpeg') {
        cb(null, true)
    } else {
        cb(null, false)
    }
}


const routerUser = require('./router/userRouter');
const routerProduct = require('./router/productRouter');
const routerCart = require('./router/cartRouter');
const routerChat = require('./router/chatRouter');


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(multer({ storage: fileStorage, fileFilter: fileFilter }).single('image'));

app.use(cors({
    credentials: true,
    origin: db.client,
    optionsSuccessStatus: 200
}))



app.use(
    session({
        secret: 'secret',
        resave: false,
        saveUninitialized: false,
        store: store
    })
)

app.use(routerUser.routerUser);
app.use(routerProduct.routerProduct);
app.use(routerCart.routerCart);
app.use(routerChat.routerChat);



app.use((error, req, res, next) => {
    res.status(500);
})


mongoose.connect(db.url, {
    dbName: 'phone_shop'
}).then(res => {

    io.on('connetion', socket => {
        console.log('Connect Sucessfullly');
    })
}).catch(err => {
    console.log('Something is wrong: ' + err)
})