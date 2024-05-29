const { UnauthenticatedError } = require('../errors')
const userService = require('../services/user.service');

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    throw UnauthenticatedError('authorization header is required');
  }

  if (!authHeader.startsWith("Bearer ")) {
    throw UnauthenticatedError('authorization header is not started with Bearer');
  }

  const token = authHeader.substring(7);
  let userFromToken = null;

  userFromToken = await userService.VerifyAccountByToken(token);
  if (!userFromToken) {
    throw UnauthenticatedError('cannot verify user from token');
  }

  req.user = userFromToken;
  next();
}

module.exports = authMiddleware;
