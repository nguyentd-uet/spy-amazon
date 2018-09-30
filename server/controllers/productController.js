var Product = require('../models/product');
var mongoose = require('mongoose')

// get all products
exports.getAll = function (req, res) {
    try {
        const perPage = 50
        const page = req.query.page || 1
        const sort = req.query.sort
        const rank_min = req.query['rank-min'] || 0
        const rank_max = req.query['rank-max']

        let sortBy = {}
        let findBy = {}
        if(sort === 'top' || sort === 'trend') {
            sortBy = {newest_rank: 1}
        } else if(sort === 'newest') {
            sortBy = {first_time_on_amazon: -1}
        }

        const {start, end, keywords} = req.query
        if(start && end) {
            findBy.first_time_on_amazon = {$gte: start, $lte: end}
        } else if(start && !end) {
            findBy.first_time_on_amazon = {$gte: start}
        } else if(!start && end) {
            findBy.first_time_on_amazon = {$lte: end}
        }

        if(rank_max) {
            findBy.newest_rank = {$gte: rank_min, $lte: rank_max}
        } else {
            findBy.newest_rank = {$gte: rank_min}
        }

        if(Array.isArray(keywords) && keywords.length > 0) {
            findBy.keywords = { $all: keywords}
        }
        Product.find(findBy)
        .sort(sortBy)
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .exec(function(err, products) {
            if(err) {
                throw err
            }
            Product.countDocuments(findBy).exec(function(err, count) {
                if (err) {
                    throw err
                }
                return res.json({
                    success: true,
                    data: products,
                    page: page,
                    limit: perPage,
                    total: count
                })
            })
        })
    } catch (error) {
        console.log(error)
        return res.json({
            success: false,
            message: error.message
        })
    }
};

// get product by id
exports.get = function (req, res) {
    try {
        const { id } = req.params
        if (mongoose.Types.ObjectId.isValid(id)) {
            Product.findOne({ _id: id }, function(err, product) {
                if(err) {
                    throw err
                }
                return res.json({
                    success: true,
                    data: product
                })
            })
        } else {
            return res.json({
                success: false,
                message: 'Id is invalid'
            })
        }
    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
};

// create a product
exports.post = function (req, res) {
    try {
        const product = new Product(req.body)
        product.save(function (err, newProduct) {
            if (err) {
                throw err
            }
            return res.json({
                success: true,
                message: 'Create product success',
                data: newProduct
            });
        });
    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
};

// update a product
exports.put = function (req, res) {
    try {
        const { id } = req.params
        if (mongoose.Types.ObjectId.isValid(id)) {
            Product.findOneAndUpdate({_id: id}, req.body, function(err, productUpdated) {
                if(err) {
                    throw err
                }
                return res.json({
                    success: true,
                    message: 'Update product success',
                    data: productUpdated
                })
            })
        } else {
            return res.json({
                success: false,
                message: 'Id is invalid'
            })
        }
    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
};

// delete a product
exports.delete = function (req, res) {
    try {
        const { id } = req.params
        if (mongoose.Types.ObjectId.isValid(id)) {
            Product.findOneAndRemove({_id: id}, function(err) {
                if(err) {
                    throw err
                }
                return res.json({
                    success: true,
                    message: 'Delete product success'
                })
            })
        } else {
            return res.json({
                success: false,
                message: 'Id is invalid'
            })
        }
    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
};
