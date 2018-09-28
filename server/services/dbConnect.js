var mongoose = require('mongoose');

exports.connectMongoDb = function() {
    //connect to MongoDB
    var mongodbUri = process.env.dbMlab
    const configs = {
        useNewUrlParser: true,
    };
    mongoose.set('useCreateIndex', true)
    mongoose.connect(mongodbUri, configs);

    mongoose.Promise = global.Promise;
    var db = mongoose.connection;

    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
};