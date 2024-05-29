const userService = require('../services/user.service');

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ messages: ['Unauthorized'] });
  }

  if (!authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ messages: ['Unauthorized'] });
  }

  const token = authHeader.substring(7);
  let userFromToken = null;
  try {
    userFromToken = await userService.VerifyAccountByToken(token);
    if (!userFromToken) {
      return res.status(401).json({ messages: ['Unauthorized'] });
    }
  } catch (e) {
    return res.status(401).json({ messages: ['Unauthorized'] });
  }

  req.user = userFromToken;
  next();
}

module.exports = authMiddleware;
