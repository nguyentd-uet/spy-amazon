var User = require('../models/user');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');

exports.isAuthenticated = function (req, res, next) {
    if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {

        var jwtToken = req.headers.authorization.split(' ')[1];
        jwt.verify(jwtToken, process.env.jwtSecret, function (err, payload) {

            if (err) {
                res.status(401).json({
                    message: 'Unauthorized user!'
                });
            } else {
                req.user = {...payload}
                next()
                // find
                // User.findOne({
                //     email: payload.email
                // }, function (err, user) {
                //     if (user) {
                //         req.user = user;
                //         next();
                //     } else {
                //         res.status(401).json({
                //             message: 'Unauthorized user!'
                //         });
                //     }
                // })
            }
        });
    } else {
        res.status(401).json({
            message: 'Unauthorized user!'
        });
    }
};