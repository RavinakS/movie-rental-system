const Joi = require('joi');

exports.userValidation = async (req, res, next) =>{
    let schema = Joi.object({
        name: Joi.string().pattern(/^[A-Z][a-z]{3,20}$/).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).max(15).required(),
        role: Joi.string(),
        rent: Joi.number()
    })

    validated = await schema.validate(req.body);
    if(validated.error){
        res.status(400).send({status_code: 400, error: validated.error.details[0].message});
    }else{
        req.validated = true;
        next()
    }
}

exports.movieValidation = async (req, res, next) =>{ 
    let schema = Joi.object({
        name: Joi.string().required(),
        releasDate: Joi.date().required(),
        genre: Joi.string().required(),
        avalCD: Joi.number().required()
    })

    let validated = await schema.validate(req.body);
    if(validated.error){
        res.status(400).send({status_code: 400, error: validated.error.details[0].message});
    }else{
        req.validated = true;
        next()
    }
}
