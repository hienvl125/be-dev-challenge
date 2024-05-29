const { AppError, NewInternalServerError } = require('../errors');
const logger = require('../utils/winston.util');

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

  logger.error("Catched error", appErr)
  res.status(err.statusCode).json(err.resp);
};

module.exports = {
  errorCatcher,
  errorHandler
}
