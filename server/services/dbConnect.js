var mongoose = require('mongoose');
var config = require('../config');

exports.connectMongoDb = function() {
    //connect to MongoDB
    var mongodbUri = config.dbUriLocal
    const configs = {
        useNewUrlParser: true,
    };
    mongoose.set('useCreateIndex', true)
    mongoose.connect(mongodbUri, configs);

    mongoose.Promise = global.Promise;
    var db = mongoose.connection;

    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
};