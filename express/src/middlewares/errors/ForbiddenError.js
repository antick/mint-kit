const httpStatus = require('http-status');
const BaseError = require('./BaseError');

class ForbiddenError {
  constructor(message = 'Not allowed') {
    this.statusCode = httpStatus.FORBIDDEN;
    this.message = message;

    // eslint-disable-next-line no-constructor-return
    return new BaseError(this.statusCode, this.message);
  }
}

module.exports = ForbiddenError;
