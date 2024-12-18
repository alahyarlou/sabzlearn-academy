const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true
    },
    href: {
        type: String,
        required: [true, 'Href is required'],
        trim: true
    }
}, { timestamps: true })


module.exports = mongoose.model('Category', schema)
