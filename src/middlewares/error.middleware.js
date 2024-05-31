const { AppError, NewInternalServerError } = require('./../errors');
const logger = require('./../utils/winston.util');

const errorHandler = (err, req, res, next) => {
  let appErr = null;
  if (err instanceof AppError) {
    appErr = err
  } else {
    appErr = NewInternalServerError(err.message)
  }

  logger.error("Catched error", appErr)
  let errResp = { errorType: appErr.errorType }
  if (appErr.resp) {
    errResp = { ...errResp, ...appErr.resp }
  }
  res.status(appErr.statusCode).json(errResp);
};

module.exports = errorHandler
