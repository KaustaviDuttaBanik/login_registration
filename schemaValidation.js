const Joi = require('@hapi/joi');

const registerValidation = data => {
    const schema = Joi.object({
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required(),
        firstName: Joi.string().min(3).required(),
        lastName: Joi.string().min(3).required(),
        empId: Joi.number().min(6).required(),
        organizationName: Joi.string().min(6).required()
    })
    return schema.validate(data);
};

const loginValidation = data => {
    const schema = Joi.object({
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    });
    return schema.validate(data);
}

const queryValidation = data => {
    const schema = Joi.object({
        firstName: Joi.string().min(3),
        lastName: Joi.string().min(3),
        empId: Joi.number().min(6),
        sortBy: Joi.string().min(5),
        orderBy: Joi.string().min(3)
    });
    return schema.validate(data);
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.queryValidation = queryValidation;