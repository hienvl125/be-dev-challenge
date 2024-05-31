const { NewBadRequestError, NewUnauthenticatedError, NewUnprocessableEntityError } = require('./../../errors')
const logger = require('./../../utils/winston.util');
const { registerValidator, loginValidator } = require('./user.validator');
const userService = require('./user.service');

const Register = async (req, res) => {
  const { error, value } = registerValidator.validate(req.body);
  if (error) {
    throw NewBadRequestError('Invalid parameters', {
      errorMessages: error.details.map(i => i.message)
    });
  }

  try {
    const createdUser = await userService.RegisterAccount({
      email: value.email,
      password: value.password,
      name: value.name,
    });

    res.json({ email: createdUser.email, name: createdUser.name })
  } catch (error) {
    logger.error('Failed to register user', error);
    throw NewUnprocessableEntityError('Failed to register user')
  }
}

const Login = async (req, res) => {
  const { error, value } = loginValidator.validate(req.body);
  if (error) {
    throw NewBadRequestError('Invalid parameters', {
      errorMessages: error.details.map(i => i.message)
    });
  }

  const authenticatedUser = await userService.LoginAccount({
    email: value.email,
    password: value.password,
  });

  if (!authenticatedUser) {
    throw NewUnauthenticatedError('Invalid email or password');
  }

  res.status(200).json(authenticatedUser);
}

module.exports = {
  Register,
  Login,
}
