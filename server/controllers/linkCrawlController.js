var LinkCrawl = require('../models/link_crawl');

// get all link
exports.getAllLink = function (req, res) {
    try {
        LinkCrawl.find({ user_id: req.user._id }, function(err, links) {
            if(err) {
                return res.json({
                    success: false,
                    message: err.message
                })
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
        LinkCrawl.findOne({ _id: id }, function(err, link) {
            if(err) {
                return res.json({
                    success: false,
                    message: err.message
                })
            }
            return res.json({
                success: true,
                data: link
            })
        })
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
        link.user_id = req.user._id
        link.save(function (err, newLink) {
            if (err) {
                return res.json({
                    success: false,
                    message: err.message
                });
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
        LinkCrawl.findOneAndUpdate({_id: req.params.id}, req.body, function(err, linkUpdated) {
            if(err) {
                return res.json({
                    success: false,
                    message: err.message
                })
            }
            return res.json({
                success: true,
                message: 'Update link success',
                data: linkUpdated
            })
        })
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
        LinkCrawl.findOneAndRemove({_id: req.params.id}, function(err) {
            if(err) {
                return res.json({
                    success: false,
                    message: err.message
                })
            }
            return res.json({
                success: true,
                message: 'Delete link success'
            })
        })
    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
};
