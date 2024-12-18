const mongoose = require('mongoose');


const schema = new mongoose.Schema({
    courseId: {
        type: mongoose.Types.ObjectId,
        ref: "Course"
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    price: {
        type: Number,
        required: true
    }
}, { timestamps: true })


module.exports = mongoose.model('courseUser', schema)