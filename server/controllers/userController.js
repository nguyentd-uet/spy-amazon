var User = require('../models/user');
var config = require('../config');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');

// register
exports.register = function (req, res) {
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
};

// login
exports.login = function (req, res) {

    const {
        email,
        password
    } = req.body;

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
                expiresIn: '7d'
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
};

// get list users
exports.getListUsers = function (req, res) {
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
};