const Validator = require('fastest-validator');

const v = new Validator();

const schema = {
    idetifier: { type: "string", min: 3, max: 100 },
    password: { type: "string" },
    $$strict: true      //no additional properties allowed
};

const check = v.compile(schema)

module.exports = check;