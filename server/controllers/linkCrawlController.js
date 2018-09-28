var LinkCrawl = require('../models/link_crawl');
var mongoose = require('mongoose')

// get all link
exports.getAllLink = function (req, res) {
    try {
        LinkCrawl.find({ user_email: req.user.email }, function(err, links) {
            if(err) {
                throw err
            }
            return res.json({
                success: true,
                data: links
            })
        })
    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
};

// get link by id 
exports.getLinkById = function (req, res) {
    try {
        const { id } = req.params
        if (mongoose.Types.ObjectId.isValid(id)) {
            LinkCrawl.findOne({ _id: id }, function(err, link) {
                if(err) {
                    throw err
                }
                return res.json({
                    success: true,
                    data: link
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

// post a link
exports.postLink = function (req, res) {
    try {
        const link = new LinkCrawl(req.body)
        link.user_email = req.user.email
        link.save(function (err, newLink) {
            if (err) {
                throw err
            }
            return res.json({
                success: true,
                message: 'Create link success',
                data: newLink
            });
        });
    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
};

// put a link
exports.putLink = function (req, res) {
    try {
        const { id } = req.params
        if (mongoose.Types.ObjectId.isValid(id)) {
            LinkCrawl.findOneAndUpdate({_id: id}, req.body, function(err, linkUpdated) {
                if(err) {
                    throw err
                }
                return res.json({
                    success: true,
                    message: 'Update link success',
                    data: linkUpdated
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

// delete a link
exports.deleteLink = function (req, res) {
    try {
        const { id } = req.params
        if (mongoose.Types.ObjectId.isValid(id)) {
            LinkCrawl.findOneAndRemove({_id: id}, function(err) {
                if(err) {
                    throw err
                }
                return res.json({
                    success: true,
                    message: 'Delete link success'
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
