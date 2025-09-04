const Joi = require('joi');

const base = {
  title: Joi.string().trim().min(1).required(),
  director: Joi.string().trim().allow('', null),
  releaseYear: Joi.number().integer().min(1878).max(3000).allow(null),
  genre: Joi.string().trim().allow('', null),
  rating: Joi.number().min(1).max(10).allow(null),
};

const createSchema = Joi.object(base).required();

// For PUT we allow partial updates for simplicity.
const updateSchema = Joi.object({
  title: Joi.string().trim().min(1),
  director: Joi.string().trim().allow(''),
  releaseYear: Joi.number().integer().min(1878).max(3000),
  genre: Joi.string().trim().allow(''),
  rating: Joi.number().min(1).max(10),
}).min(1);

function validate(schema) {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, { abortEarly: false, stripUnknown: true });
    if (error) {
      const err = new Error('Validation failed: ' + error.details.map(d => d.message).join('; '));
      err.status = 400;
      return next(err);
    }
    req.validated = value;
    next();
  };
}

module.exports = {
  validateCreate: validate(createSchema),
  validateUpdate: validate(updateSchema),
};
