var express = require('express');
var router = express.Router();

var product_controller = require('../controllers/productController');
var auth_middleware = require('../middlewares/authMiddleware');

// GET list products
router.get('/', auth_middleware.isAuthenticated, product_controller.getAll);

// GET product by id
router.get('/:id', auth_middleware.isAuthenticated, product_controller.get);

// create a product
router.post('/', auth_middleware.isAuthenticated, product_controller.post);

// update a product
router.put('/:id', auth_middleware.isAuthenticated, product_controller.put);

// delete a product
router.delete('/:id', auth_middleware.isAuthenticated, product_controller.delete);

module.exports = router;