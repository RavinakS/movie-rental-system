const Joi = require('joi');

const userValidation = Joi.object({
    name: Joi.string().min(3).max(10).pattern(/^[A-Z][a-z]+$/).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(15).required(),
    role: Joi.string().default('Viewer').required(),
    rent: Joi.number().required()
})

const movieValidation = Joi.object({
    movieName: Joi.string().required(),
    releasDate: Joi.date().required(),
    genre: Joi.string().required(),
    avalCD: Joi.number().required()
})

module.exports = {userValidation, movieValidation};