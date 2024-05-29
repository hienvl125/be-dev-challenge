const BAD_REQUEST = 400;
const NOT_FOUND = 404;
const INTERNAL_SERVER_ERROR = 500;
const UNAUTHORIZED = 403;
const UNAUTHENTICATED = 401;
const UNPROCESSABLE_ENTITY = 422;

const ERROR_MESSAGES = {
  [BAD_REQUEST]: 'Bad Request',
  [NOT_FOUND]: 'Not Found',
  [INTERNAL_SERVER_ERROR]: 'Internal Server Error',
  [UNAUTHORIZED]: 'Unauthorized',
  [UNAUTHENTICATED]: 'Unauthenticated',
  [UNPROCESSABLE_ENTITY]: 'Unprocessable Entity',
}

class AppError extends Error {
  constructor(message, statusCode, resp = null) {
    super(message);
    this.statusCode = statusCode;
    if (resp) {
      this.resp = resp;
    } else {
      this.resp = {
        errorMessages: [ERROR_MESSAGES[statusCode]]
      }
    }
  }
}

const NewBadRequestError = (message, resp = null) => {
  return new AppError(message, BAD_REQUEST, resp);
}

const NewNotFoundError = (message, resp = null) => {
  return new AppError(message, NOT_FOUND, resp);
}

const NewInternalServerError = (message, resp = null) => {
  return new AppError(message, INTERNAL_SERVER_ERROR, resp);
}

const NewUnauthorizedError = (message, resp = null) => {
  return new AppError(message, UNAUTHORIZED, resp);
}

const NewUnauthenticatedError = (message, resp = null) => {
  return new AppError(message, UNAUTHENTICATED, resp);
}

const NewUnprocessableEntityError = (message, resp = null) => {
  return new AppError(message, UNPROCESSABLE_ENTITY, resp);
}

module.exports = {
  AppError,
  NewBadRequestError,
  NewNotFoundError,
  NewInternalServerError,
  NewUnauthorizedError,
  NewUnauthenticatedError,
  NewUnprocessableEntityError
}
