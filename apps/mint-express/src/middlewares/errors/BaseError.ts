/**
 * Base Error which extends the Error class
 * This empowers all the custom error messages
 */
class BaseError extends Error {
  public statusCode: number;
  public isOperational: boolean;

  constructor(statusCode, message, isOperational = true, stack = '') {
    super(message);

    this.statusCode = statusCode;
    this.isOperational = isOperational;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default BaseError;
