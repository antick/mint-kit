import * as joi from 'joi';
import { pick } from '../utils';
import BadRequestError from './errors/BadRequestError';

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

export default validateMiddleware;
