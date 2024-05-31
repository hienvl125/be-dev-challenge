const prismaClient = require('./../../prisma-client');
const passwordUtil = require('./../../utils/password.util');
const jwtUtil = require('./../../utils/jwt.util');

const RegisterAccount = async ({ email, password, name }) => {
  const hashedPassword = await passwordUtil.hashPassword(password);
  const user = await prismaClient.user.create({
    data: {
      email,
      hashedPassword,
      name
    }
  });
  return user;
}

const LoginAccount = async ({ email, password }) => {
  const user = await prismaClient.user.findUnique({
    where: {
      email
    }
  });

  if (!user) {
    return null;
  }

  const isPasswordMatch = await passwordUtil.comparePassword(password, user.hashedPassword);
  if (!isPasswordMatch) {
    return null;
  }

  const accessToken = jwtUtil.generateToken({ email: user.email, id: user.id });

  return {
    email: user.email,
    name: user.name,
    accessToken,
  };
}

const VerifyAccountByToken = async (token) => {
  const payload = jwtUtil.verifyToken(token);
  if (!payload) {
    return null;
  }

  const user = await prismaClient.user.findUnique({
    where: {
      email: payload.email,
      id: payload.id
    }
  });

  if (!user) {
    return null;
  }

  return {
    id: user.id,
    email: user.email,
    name: user.name,
  };
}

module.exports = {
  RegisterAccount,
  LoginAccount,
  VerifyAccountByToken,
}
