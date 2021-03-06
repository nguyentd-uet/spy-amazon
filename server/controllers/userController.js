var User = require('../models/user');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');

// register
exports.register = async function (req, res) {
    try {
        // find
        const findUser = await User.findOne({email: req.body.email})
        if(findUser) {
            return res.json({
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
                throw err;
            }
            if (newUser) {
                newUser.hash_password = undefined
                return res.json({
                    success: true,
                    message: 'Successfully registered',
                    data: newUser
                });
            }
        });
    } catch(error) {
        return res.json({
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
            if (err) throw err
            if (!user) {
                return res.json({
                    success: false,
                    message: 'User is not exist'
                })
            } else if (user && user.comparePassword(password)) {
                const payload = {
                    email: user.email,
                    username: user.username
                };
                const jwtToken = jwt.sign(payload, process.env.jwtSecret, {
                    expiresIn: '1d'
                });
                console.log('jwtToken: ' + jwtToken);
                const jsonResponse = {
                    access_token: jwtToken,
                    username: user.username,
                    email: user.email
                }
                return res.json({
                    success: true,
                    message: 'Successfully log in',
                    data: jsonResponse
                })
            } else {
                return res.json({
                    success: false,
                    message: 'Email or password incorrect'
                })
            }
        })
    } catch(error) {
        return res.json({
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
                throw err
            }
            if (users) {
                users.forEach(function (item) {
                    item.hash_password = undefined
                })
                const jsonResponse = {
                    users: users
                }
                return res.json({
                    success: true,
                    data: jsonResponse
                })
            }
        })
    } catch(error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
};

// check token
exports.checkToken = function (req, res) {
    try {
        var jwtToken = req.body.token;
        jwt.verify(jwtToken, process.env.jwtSecret, function (err, payload) {
            if (err) {
                return res.json({
                    success: false,
                    message: 'Token invalid'
                });
            } else {
                return res.json({
                    success: true,
                    message: 'Token valid'
                })
            }
        });
    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
}