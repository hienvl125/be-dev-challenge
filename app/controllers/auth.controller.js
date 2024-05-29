const Joi = require('joi');
const userService = require('../services/user.service');

const Register = async (req, res) => {
  const registerValidator = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    name: Joi.string().min(3).allow(null).optional(),
  });

  const { error, value } = registerValidator.validate(req.body);
  if (error) {
    return res.status(400).json({
      messages: error.details.map(i => i.message)
    })
  }

  try {
    const createdUser = await userService.RegisterAccount({
      email: value.email,
      password: value.password,
      name: value.name,
    });
  
    res.json({ email: createdUser.email, name: createdUser.name })
  } catch (e) {
    // TODO: Log error from exception
    res.status(422).json({ messages: ['Something went wrong'] });
  }
}

const Login = async (req, res) => {
  const registerValidator = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  const { error, value } = registerValidator.validate(req.body);
  if (error) {
    return res.status(400).json({
      messages: error.details.map(i => i.message)
    })
  }

  try {
    const authenticatedUser = await userService.LoginAccount({
      email: value.email,
      password: value.password,
    });
  
    if (!authenticatedUser) {
      return res.status(401).json({ messages: ['Invalid email or password'] });
    }

    res.status(200).json(authenticatedUser);
  } catch (e) {
    // TODO: Log error from exception
    res.status(422).json({ messages: ['Something went wrong'] });
  }
}

module.exports = {
  Register,
  Login,
}
