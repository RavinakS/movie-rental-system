const Joi = require('joi');

exports.userValidation = Joi.object({
    name: Joi.string().min(3).max(10).pattern(/^[A-Z][a-z]+$/).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(15).required(),
    role: Joi.string(),
    rent: Joi.number()
})

exports.movieValidation = Joi.object({
    name: Joi.string().required(),
    releasDate: Joi.date().required(),
    genre: Joi.string().required(),
    avalCD: Joi.number().required()
})
