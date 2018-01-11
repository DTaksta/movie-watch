var mongoose = require('mongoose');
var encrypt = require('../utils/encrypt');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    fullName: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    salt: String,
    watchedMovies: [{ type: Schema.Types.ObjectId, ref: 'Movie' }],
    trackedMovies: [{ type: Schema.Types.ObjectId, ref: 'Movie' }],
    createdAt: { type: Date, default: Date.now }
});

userSchema.pre('save', function(next) {
    // Hash password
    if (!this.salt) {
            this.salt = encrypt.createSalt();
            this.password = encrypt.hashPassword(this.salt,  this.password);
    }

    next();
});

userSchema.methods.validPassword = function(password) {
    return encrypt.hashPassword(this.salt, password) === this.password;
};

var User = mongoose.model('User', userSchema);

module.exports = User;