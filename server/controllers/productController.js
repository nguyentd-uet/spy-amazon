var Product = require('../models/product');

// get all products
exports.getAllProducts = function (req, res) {
    try {
        const perPage = 50
        const page = req.params.page || 1
        const sort = req.params.sort
        let sortBy = {}
        let findBy = {}
        if(sort === 'top') {
            sortBy = {newest_rank: 1}
            findBy.newest_rank = {$gt: 0}
        } else if(sort === 'newest') {
            sortBy = {first_time_on_amazon: -1}
        } 

        const {startDate, endDate} = req.query
        if(startDate) {
            findBy.first_time_on_amazon.$gte = startDate
        }
        if(endDate) {
            findBy.first_time_on_amazon.$lte = endDate
        }
        Product.find(findBy)
        .sort(sortBy)
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .exec(function(err, products) {
            if(err) {
                res.json({
                    success: false,
                    message: error.message
                })
            }
            Product.countDocuments().exec(function(err, count) {
                if (err) {
                    res.json({
                        success: false,
                        message: err.message
                    })
                }
                res.json({
                    success: true,
                    data: products,
                    page: page,
                    limit: perPage,
                    total: count
                })
            })
        })
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
};

// get product by id
exports.getProductById = function (req, res) {
    try {
        const { id } = req.params
        Product.findOne({ _id: id }, function(err, product) {
            if(err) {
                res.json({
                    success: false,
                    message: err.message
                })
            }
            res.json({
                success: true,
                data: product
            })
        })
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
};

// create a product
exports.postProduct = function (req, res) {
    try {
        const product = new Product(req.body)
        product.save(function (err, newProduct) {
            if (err) {
                res.json({
                    success: false,
                    message: err.message
                });
            }
            res.json({
                success: true,
                message: 'Create product success',
                data: newProduct
            });
        });
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
};

// update a product
exports.putProduct = function (req, res) {
    try {
        Product.findOneAndUpdate({_id: req.params.id}, req.body, function(err, productUpdated) {
            if(err) {
                res.json({
                    success: false,
                    message: err.message
                })
            }
            res.json({
                success: true,
                message: 'Update product success',
                data: productUpdated
            })
        })
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
};

// delete a product
exports.deleteProduct = function (req, res) {
    try {
        Product.findOneAndRemove({_id: req.params.id}, function(err) {
            if(err) {
                res.json({
                    success: false,
                    message: err.message
                })
            }
            res.json({
                success: true,
                message: 'Delete product success'
            })
        })
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
};
