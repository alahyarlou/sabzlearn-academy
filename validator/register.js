const Validator = require('fastest-validator');

const v = new Validator();

const schema = {
    username: { type: "string", min: 3, max: 100 },
    name: { type: "string", min: 3, max: 255 },
    email: { type: "email" },
    phone: { type: "string", max: 11 },
    password: { type: "string" },
    confirmPassword: { type: "equal", field: "password" },
    $$strict: true      //no additional properties allowed
};

const check = v.compile(schema)

module.exports = check;