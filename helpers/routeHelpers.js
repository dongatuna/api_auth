const Joi = require('joi');

module.exports = {
    validateBody:(schema)=>{
        return(req, res, next)=>{
            const result = Joi.validate(req.body, schema);

            if(result.error){
                return res.status(404).json(result.error);
            }

            //if validation is successful, then it will be contained in req.value.body
            if(!req.value){req.value = {};}

            req.value["body"]= result.value;
            next();
        }
    },

    schemas: {
        //contains all the schemas of the project
        authSchema: Joi.object().keys({
            email: Joi.string().email().required(),
            password:Joi.string().min(6).required()
        })
    }
}