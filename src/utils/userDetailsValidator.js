const Joi = require("joi");

const userDetailsValidate = Joi.object({
    fullName: Joi.string().required().messages({
        "string.base": "Name Must String",
        "string.empty": "Name is Mandatory"

    }),
    username: Joi.string()
        .alphanum()
        .min(5)
        .max(30)
        .required().messages({
            "string.min": "User name Should contain at lease 5 characters",
            "string.empty": "User name is Mandatory"
        }),
    email: Joi.string().required().email(),
    password: Joi.string().min(8).max(30)
        .pattern(new RegExp('^[a-zA-Z0-9]{8,30}$')).messages({
            "string.base": "Password must be String",
            "string.min": "Password must contain at least 8 characters",
            "string.max": "Password should not exceed 30 characters",
            "string.empty": "Password is Mandatory"
        }),
    mobile: Joi.string().min(10).max(10).required(),

});

module.exports = { userDetailsValidate }