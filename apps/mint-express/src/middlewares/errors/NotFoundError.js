import * as httpStatus from 'http-status';
import BaseError from './BaseError';

class NotFoundError {
  constructor(message) {
    this.statusCode = httpStatus.NOT_FOUND;
    this.isOperational = true;
    this.message = message;

    return new BaseError(this.statusCode, this.message);
  }
}

export default NotFoundError;
