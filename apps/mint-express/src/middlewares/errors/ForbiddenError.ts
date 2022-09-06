import * as httpStatus from 'http-status';
import BaseError from './BaseError';

class ForbiddenError {
  public statusCode: number;
  public message: string;

  constructor(message = 'Not allowed') {
    this.statusCode = httpStatus.FORBIDDEN;
    this.message = message;

    return new BaseError(this.statusCode, this.message);
  }
}

export default ForbiddenError;
