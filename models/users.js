const mongoose = require('mongoose');

// ========== Import Database ==========
require('../config/config');

let UserSchema = new mongoose.Schema({
    googleId: String,
    facebookId: String,
    first_name: String,
    last_name: String,
    email: String,
    password: String
})


module.exports = mongoose.model('users', UserSchema);