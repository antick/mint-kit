import * as httpStatus from 'http-status';
import BaseError from './BaseError';

class AuthError {
  public statusCode: number;
  public message: string;

  constructor(message = 'Authentication required!') {
    this.statusCode = httpStatus.UNAUTHORIZED;
    this.message = message;

    return new BaseError(this.statusCode, this.message);
  }
}

export default AuthError;
