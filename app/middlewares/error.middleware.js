const { AppError, NewInternalServerError } = require('../errors');

const errorCatcher = (handler) => async (req, res, next) => {
  try {
    await handler(req, res, next);
  } catch (err) {
    next(err);
  }
};

const errorHandler = (err, req, res, next) => {
  let appErr = null;
  if (err instanceof AppError) {
    appErr = err
  } else {
    appErr = NewInternalServerError(err.message)
  }

  // TODO: Log error to stderr
  res.status(err.statusCode).json(err.resp);
};

module.exports = {
  errorCatcher,
  errorHandler
}
