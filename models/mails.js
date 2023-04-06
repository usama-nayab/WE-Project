const mongoose = require('mongoose');

// ========== Import Database ==========
require('../config/config');

let MailSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    message: String
})


module.exports = mongoose.model('mails', MailSchema);