const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true
    },
    time: {
        type: String,
        required: [true, 'Time is required'],
        trim: true
    },
    free: {
        type: Boolean, // Corrected to Boolean for logical representation
        required: [true, 'Free status is required']
    },
    video: {
        type: String,
        required: true
    },
    courseId: {
        type: mongoose.Types.ObjectId,
        ref: "Course",
        required: false // Optional field
    }
}, { timestamps: true });

module.exports = mongoose.model('Session', schema);
