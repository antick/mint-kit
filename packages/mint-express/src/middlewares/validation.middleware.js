const joi = require('joi');
const { pick } = require('../utils');
const BadRequestError = require('./errors/BadRequestError');

const validateMiddleware = schema => (req, res, next) => {
  const validSchema = pick(schema, ['params', 'query', 'body']);
  const object = pick(req, Object.keys(validSchema));
  const { value, error } = joi.compile(validSchema)
    .prefs({ errors: { label: 'key' } })
    .validate(object);

  if (error) {
    const errorMessage = error.details.map(details => details.message).join(', ');
    return next(new BadRequestError(errorMessage));
  }

  Object.assign(req, value);

  return next();
};

module.exports = validateMiddleware;
