const mongoose = require('mongoose');

// ========== Import Database ==========
require('../config/config');

let CandidateSchema = new mongoose.Schema({
    full_name: String,
    father_name: String,
    email: String,
    phone: String,
    address: String,
    options: Array
})


module.exports = mongoose.model('candidates', CandidateSchema);