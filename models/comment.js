const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    body: {
        type: String,
        required: [true, 'Comment body is required'],
        trim: true
    },
    courseId: {
        type: mongoose.Types.ObjectId,
        ref: "Course",
        required: [true, 'Course reference is required']
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: [true, 'User reference is required']
    },
    score: {
        type: Number,
        min: [0, 'Score cannot be less than 0'],
        max: [5, 'Score cannot be more than 5'],
        default: 5,
        required: true
    },
    isAccept: {
        type: Boolean, // true or false
        required: true
    },
    isAnswer: {
        type: Boolean, // true or false
        required: true
    },
    mainCommentId: {
        type: mongoose.Types.ObjectId,
        ref: "Comment",
        required: false // Allow this to be optional for top-level comments
    }
}, { timestamps: true });

module.exports = mongoose.model('Comment', schema);
