var User = require('../models/user');
var config = require('../config');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');

// register
exports.register = async function (req, res) {
    try {
        // find
        const findUser = User.findOne({email: req.body.email})
        if(findUser) {
            res.json({
                success: false,
                message: 'User already exist'
            })
        }

        // get user
        let user = new User(req.body);
        user.hash_password = bcrypt.hashSync(req.body.password, 10);
        const currentDate = new Date()
        user.created_date = currentDate
        user.updated_date = currentDate

        // save
        user.save(function (err, newUser) {
            if (err) {
                res.json({
                    success: false,
                    message: err.message
                });
            }
            newUser.hash_password = undefined
            res.json({
                success: true,
                message: 'Successfully registered',
                data: newUser
            });
        });
    } catch(error) {
        res.json({
            success: false,
            message: error.message
        });
    }
};

// login
exports.login = function (req, res) {
    try {
        const {email,password} = req.body;

        // find
        User.findOne({
            email: email
        }, function (err, user) {
            if (!user) {
                res.json({
                    success: false,
                    message: 'User is not exist'
                })
            } else if (user && user.comparePassword(password)) {
                const payload = {
                    email: user.email
                };
                const jwtToken = jwt.sign(payload, config.jwtSecret, {
                    expiresIn: '1d'
                });
                console.log('jwtToken: ' + jwtToken);
                const jsonResponse = {
                    access_token: jwtToken,
                    username: user.username,
                    email: user.email
                }
                res.json({
                    success: true,
                    message: 'Successfully log in',
                    data: jsonResponse
                })
            } else {
                res.json({
                    success: false,
                    message: 'Email or password incorrect'
                })
            }
        })
    } catch(error) {
        res.json({
            success: false,
            message: error.message
        })
    }
};

// get list users
exports.getListUsers = function (req, res) {
    try {
        // find
        User.find({}, function (err, users) {
            if (err) {
                res.json({
                    success: false,
                    message: err.message
                })
            }
            if (users) {
                users.forEach(function (item) {
                    item.hash_password = undefined
                })
                const jsonResponse = {
                    users: users
                }
                res.json({
                    success: true,
                    data: jsonResponse
                })
            }
        })
    } catch(error) {
        res.json({
            success: false,
            message: error.message
        })
    }
};

// check token
exports.checkToken = function (req, res) {
    try {
        var jwtToken = req.body.token;
        jwt.verify(jwtToken, config.jwtSecret, function (err, payload) {
            if (err) {
                res.json({
                    success: false,
                    message: 'Token invalid'
                });
            } else {
                res.json({
                    success: true,
                    message: 'Token valid'
                })
            }
        });
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}