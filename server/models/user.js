var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    hash_password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true
    },
    created_date: String,
    updated_date: String,
    birth_date: String,
    gender: String,
    avatar: String,
    role: String
}, {
    collection: 'user'
});

// comparePassword
UserSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.hash_password)
}

//Export function to create "UserSchema" model class
module.exports = mongoose.model('User', UserSchema);