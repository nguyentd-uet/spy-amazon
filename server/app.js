var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var db = require('./services/dbConnect');

var indexRouter = require('./routes/index');
var userRouter = require('./routes/user');
var linkCrawlRouter = require('./routes/linkCrawl')
var productRouter = require('./routes/product')

var app = express();

if (process.env.NODE_ENV !== "production") {
  require('dotenv').load();
}

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  next();
});

// Serve static files from the React app
const staticFiles = express.static(path.join(__dirname, '../../client/build'))
app.use(staticFiles)

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api', indexRouter);
app.use('/api/users', userRouter);
app.use('/api/links', linkCrawlRouter);
app.use('/api/products', productRouter);

// any routes not picked up by the server api will be handled by the react router
app.use('/*', staticFiles)

app.set('port', (process.env.PORT || 3001))
app.listen(app.get('port'), () => {
  console.log(`Listening on ${app.get('port')}`)
})

db.connectMongoDb();

module.exports = app;
