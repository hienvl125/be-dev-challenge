const envConfig = require("../../envconfig")
const jwt = require("jsonwebtoken")

const generateToken = (payload) => {
  return jwt.sign(payload, envConfig.JWT_SECRET, { expiresIn: '1d' });
}

const verifyToken = (token) => {
  return jwt.verify(token, envConfig.JWT_SECRET);
}

module.exports = {
  generateToken,
  verifyToken
}
