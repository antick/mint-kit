const NotFoundError = require('./errors/NotFoundError');

const notFoundErrorHandler = (req, res, next) => {
  next(new NotFoundError('Resource not found'));
};

const errorHandler = (error, req, res, next) => {
  res
    .status(error?.statusCode || 500)
    .json({
      stack: error.stack,
      status: error.statusCode,
      message: error.message
    });
};

export {
  notFoundErrorHandler,
  errorHandler
};
