const httpStatus = require('http-status');
const BaseError = require('./BaseError');

class NotFoundError {
  constructor(message) {
    this.statusCode = httpStatus.NOT_FOUND;
    this.isOperational = true;
    this.message = message;

    // eslint-disable-next-line no-constructor-return
    return new BaseError(this.statusCode, this.message);
  }
}

module.exports = NotFoundError;
