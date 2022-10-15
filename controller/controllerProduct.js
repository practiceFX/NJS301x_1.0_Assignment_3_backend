const mongoose = require('mongoose');
const modelProduct = require('../model/modelProduct');




exports.listProduct = (req, res, next) => {
    modelProduct.find().then(result => {
        res.send(result);

    }).catch(err => {
        err => {
            const error = new Error(err);
            return next(error);
        }
    })
}
exports.TopProduct = (req, res, next) => {
    modelProduct.find().limit(8).then(result => {
        res.send({
            data: result,
            csrfToken: req.csrfToken()
        });
        // console.log(...result, { 'csrfToken': req.csrfToken() })
    }).catch(err => {
        err => {
            const error = new Error(err);
            return next(error);
        }
    })
}



exports.categoryProduct = (req, res, next) => {
    let category = req.query.category;
    console.log(category)
    if (category != 'null' && category != 'all') {
        modelProduct.find({ category: category }).then(result => {
            res.send(result,);
        }).catch(
            err => {
                const error = new Error(err);
                return next(error);
            }
        )
    }
    if (category == 'null' || category == 'all') {
        modelProduct.find().then(result => {
            res.send(result,);
        }).catch(
            err => {
                const error = new Error(err);
                return next(error);
            }
        )
    }
}

exports.detailProduct = (req, res, next) => {
    let id = req.query.id;

    modelProduct.find({ _id: id }).then(result => {
        res.send({
            data: result,
            csrfToken: req.csrfToken()
        });
    }).catch(
        err => {
            const error = new Error(err);
            return next(error);
        }
    );
}


exports.relatedProduct = (req, res, next) => {
    let category = req.query.category;
    modelProduct.find({ category: category }).then(result => {
        res.send(result,);
    }).catch(err => {
        return next(err)
    })
}


exports.addProduct = (req, res, next) => {
    let _id = String(new mongoose.Types.ObjectId);
    let category = req.body.category;
    let img1 = req.file[0];
    let img2 = req.file[1];
    let img3 = req.file[2];
    let img4 = req.file[3];
    let long_desc = req.body.long_desc;
    let name = req.body.name;
    let short_desc = req.body.short_desc;
    let newProduct = new modelProduct({
        _id: _id, category: category,
        img1: img1, img2: img2, img3: img3, img4: img4,
        long_desc: long_desc, name: name, price: price,
        short_desc: short_desc
    })
    newProduct.save().then(result => {
        res.status(200);
    })
}

exports.editProduct = (req, res, next) => {
    let _id = req.body._id;
    modelProduct.findById(_id).then(result => {
        result.category = req.body.category;
        result.long_desc = req.body.long_desc;
        result.name = req.body.name;
        result.short_desc = req.body.short_desc;
        return result.save();
    }).then(respon => {
        res.status(200)
    }).catch(err => {
        return next(err)
    }
    )
}

exports.deleteProduct = (req, res, next) => {
    let _id = req.body._id;
    modelProduct.deleteOne({ '_id': _id }, (err) => {
        !err ? res.status(200) : res.status(err)
    })
}
