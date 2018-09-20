var express = require('express');
var router = express.Router();

var link_crawl_controller = require('../controllers/linkCrawlController');
var auth_controller = require('../controllers/authController');

// GET list links
router.get('/all/get', auth_controller.isAuthenticated, link_crawl_controller.getAllLink);

// GET link by id
router.get('/:id', auth_controller.isAuthenticated, link_crawl_controller.getLinkById);

// post a link
router.post('/', auth_controller.isAuthenticated, link_crawl_controller.postLink);

// put a link
router.put('/:id', auth_controller.isAuthenticated, link_crawl_controller.putLink);

// delete a link
router.delete('/:id', auth_controller.isAuthenticated, link_crawl_controller.deleteLink);

module.exports = router;