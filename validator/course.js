const Validator = require('fastest-validator');

const v = new Validator();

const createCourseSchema = {
    name: { type: "string", min: 3, max: 100, messages: { required: "Course name is required" } },
    description: { type: "string", empty: false, messages: { required: "Description is required" } },
    status: { type: "string", enum: ['compleate', 'presale', 'inProgress', 'notStarted'], messages: { required: "Status is required" } },
    support: { type: "string", empty: false, messages: { required: "Support information is required" } },
    href: { type: "string", empty: false, messages: { required: "Href is required" } },
    price: { type: "string", messages: { required: "Price is required", number: "Price must be a number" } },
    discount: { type: "string", messages: { required: "Discount is required", number: "Discount must be a number" } },
    categoryId: { type: "string", empty: false, messages: { required: "Category reference is required" } },
    $$strict: true      // No additional properties allowed
};

const createCourseVal = v.compile(createCourseSchema);


module.exports = { createCourseVal };