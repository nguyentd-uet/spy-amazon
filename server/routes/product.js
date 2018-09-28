var express = require('express');
var router = express.Router();

var product_controller = require('../controllers/productController');
var auth_middleware = require('../middlewares/authMiddleware');

// GET list products
router.get('/', auth_middleware.isAuthenticated, product_controller.getAllProducts);

// GET product by id
router.get('/:id', auth_middleware.isAuthenticated, product_controller.getProductById);

// create a product
router.post('/', auth_middleware.isAuthenticated, product_controller.postProduct);

// update a product
router.put('/:id', auth_middleware.isAuthenticated, product_controller.putProduct);

// delete a product
router.delete('/:id', auth_middleware.isAuthenticated, product_controller.deleteProduct);

module.exports = router;