const httpStatus = require('http-status');
const BaseError = require('./BaseError');

class BadRequestError {
  constructor(message) {
    this.statusCode = httpStatus.BAD_REQUEST;
    this.message = message;

    // eslint-disable-next-line no-constructor-return
    return new BaseError(this.statusCode, this.message);
  }
}

module.exports = BadRequestError;
