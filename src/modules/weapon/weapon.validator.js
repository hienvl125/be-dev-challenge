const Joi = require('joi');

const indexValidator = Joi.object({
  page: Joi.number().integer().min(1).default(1).greater(0),
  per_page: Joi.number().integer().min(1).default(10).greater(0),
});

const createValidator = Joi.object({
  name: Joi.string().min(3).required(),
  level: Joi.number().integer().min(1).default(1),
  attack: Joi.number().integer().min(1).required(),
  durability: Joi.number().integer().min(1).required(),
});

const updateValidator = Joi.object({
  name: Joi.string().min(3).optional(),
  level: Joi.number().integer().min(1).optional(),
  attack: Joi.number().integer().min(1).optional(),
  durability: Joi.number().integer().min(1).optional(),
});

module.exports = {
  indexValidator,
  createValidator,
  updateValidator,
}
