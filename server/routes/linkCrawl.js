var express = require('express');
var router = express.Router();

var link_crawl_controller = require('../controllers/linkCrawlController');
var auth_middleware = require('../middlewares/authMiddleware');

// GET list links
router.get('/', auth_middleware.isAuthenticated, link_crawl_controller.getAllLink);

// GET link by id
router.get('/:id', auth_middleware.isAuthenticated, link_crawl_controller.getLinkById);

// post a link
router.post('/', auth_middleware.isAuthenticated, link_crawl_controller.postLink);

// put a link
router.put('/:id', auth_middleware.isAuthenticated, link_crawl_controller.putLink);

// delete a link
router.delete('/:id', auth_middleware.isAuthenticated, link_crawl_controller.deleteLink);

module.exports = router;