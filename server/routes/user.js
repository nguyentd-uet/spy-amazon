var express = require('express');
var router = express.Router();

var user_controller = require('../controllers/userController');
var auth_middleware = require('../middlewares/authMiddleware');

// GET list users
router.get('/', auth_middleware.isAuthenticated, user_controller.getListUsers);

// Register
router.post('/register',  user_controller.register);

// Login
router.post('/login',  user_controller.login);

// Check token
router.post('/checkToken',  user_controller.checkToken);

// Logout
// router.get('/logout',  auth_middleware.isAuthenticated, user_controller.logout);

module.exports = router;