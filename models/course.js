const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Course name is required'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        trim: true
    },
    status: {
        type: String,
        enum: ['compleate', 'presale', 'inProgress', 'notStarted'],
        required: [true, 'Status is required']
    },
    support: {
        type: String,
        required: [true, 'Support information is required'],
        trim: true
    },
    author: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Author reference is required']
    },
    cover: {
        type: String,
        required: [true, 'Cover image is required'],
        trim: true
    },
    href: {
        type: String,
        required: [true, 'Href is required'],
        trim: true
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: [0, 'Price cannot be negative']
    },
    discount: {
        type: Number,
        required: [true, 'Discount is required'],
    },
    categoryId: {
        type: mongoose.Types.ObjectId,
        ref: 'Category',
        required: [true, 'Category reference is required']
    }
}, { timestamps: true });

// Virtual relationships
courseSchema.virtual('sessions', {
    ref: 'Session',
    localField: '_id',
    foreignField: 'course'
});

courseSchema.virtual('comments', {
    ref: 'Comment',
    localField: '_id',
    foreignField: 'course'
});

module.exports = mongoose.model('Course', courseSchema);
