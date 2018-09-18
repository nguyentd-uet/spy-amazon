var express = require('express');
var router = express.Router();
const {crawlData} = require('../services/crawler');

/* GET home page. */
router.get('/', function(req, res, next) {
  crawlData();
  res.json({title: 'respond with a resource'});
});



module.exports = router;
