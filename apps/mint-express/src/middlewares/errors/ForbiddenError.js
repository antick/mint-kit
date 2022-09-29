import * as httpStatus from 'http-status';
import BaseError from './BaseError';

class ForbiddenError {
  constructor(message = 'Not allowed') {
    this.statusCode = httpStatus.FORBIDDEN;
    this.message = message;

    return new BaseError(this.statusCode, this.message);
  }
}

export default ForbiddenError;
