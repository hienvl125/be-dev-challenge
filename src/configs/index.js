const env = require('env-var');

const NODE_ENV = env.get('NODE_ENV').default('development').asString();
const PORT = env.get('PORT').default('3000').asPortNumber();
const JWT_SECRET = env.get('JWT_SECRET').required().asString();
const DATABASE_URL = env.get('DATABASE_URL').required().asUrlString();

module.exports = {
  NODE_ENV,
  PORT,
  JWT_SECRET,
  DATABASE_URL
};
