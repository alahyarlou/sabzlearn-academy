const Validator = require('fastest-validator');

const v = new Validator();

const updateSessionSchema = {
    title: { type: "string", empty: true },
    time: { type: "string", empty: true },
    free: { type: "boolean", empty: false },
    $$strict: true
}


const updateSessionVal = v.compile(updateSessionSchema);


module.exports = { updateSessionVal };