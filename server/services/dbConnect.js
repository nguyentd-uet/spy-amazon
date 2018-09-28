var mongoose = require('mongoose');

exports.connectMongoDb = function() {
    //connect to MongoDB
    // var mongodbUri = process.env.dbUriLocal ||  process.env.dbMlab
    var mongodbUri = "mongodb://nguyennd9zzz:ducnguyen1501@ds259912.mlab.com:59912/spy_amazon"
    const configs = {
        useNewUrlParser: true,
    };
    mongoose.set('useCreateIndex', true)
    mongoose.connect(mongodbUri, configs);

    mongoose.Promise = global.Promise;
    var db = mongoose.connection;

    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
};