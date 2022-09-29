import * as httpStatus from 'http-status';
import BaseError from './BaseError';

class AuthError {
  constructor(message = 'Authentication required!') {
    this.statusCode = httpStatus.UNAUTHORIZED;
    this.message = message;

    return new BaseError(this.statusCode, this.message);
  }
}

export default AuthError;
