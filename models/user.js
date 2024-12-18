const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        trim: true
    },
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address']
    },
    phone: {
        type: String,
        required: [true, 'Phone number is required'],
        match: [/^\d{11}$/, 'Please use a valid phone number']
    },
    role: {
        type: String,
        enum: ['ADMIN', 'USER'],
        default: 'USER'
    }
}, { timestamps: true });

const userModel = mongoose.model('User', schema);

module.exports = userModel;
