const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    phone: {
        type: String,
        required: [true, 'Phone number is required'],
        match: [/^\d{11}$/, 'Please use a valid phone number']
    }
}, { timestamps: true })

module.exports = mongoose.model('BanUsers', schema);