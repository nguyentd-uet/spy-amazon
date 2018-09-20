var express = require('express');
var router = express.Router();

var product_controller = require('../controllers/productController');
var auth_controller = require('../controllers/authController');

// GET list products
router.get('/all/get/:page/:sort', auth_controller.isAuthenticated, product_controller.getAllProducts);

// GET product by id
router.get('/:id', auth_controller.isAuthenticated, product_controller.getProductById);

// create a product
router.post('/', auth_controller.isAuthenticated, product_controller.postProduct);

// update a product
router.put('/:id', auth_controller.isAuthenticated, product_controller.putProduct);

// delete a product
router.delete('/:id', auth_controller.isAuthenticated, product_controller.deleteProduct);

module.exports = router;