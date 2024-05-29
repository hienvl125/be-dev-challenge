const Joi = require('joi');
const { NewBadRequestError, NewNotFoundError } = require('../errors')
const logger = require('../utils/winston.util');
const weaponService = require('../services/weapon.service');

const Index = async (req, res) => {
  const indexValidator = Joi.object({
    page: Joi.number().integer().min(1).default(1).greater(0),
    per_page: Joi.number().integer().min(1).default(10).greater(0),
  });


  const { error, value } = indexValidator.validate(req.query);
  if (error) {
    throw NewBadRequestError('Invalid parameters', {
      errorMessages: error.details.map(i => i.message)
    });
  }

  const { page, per_page: perPage } = value;
  const userId = req.user.id;
  const weaponsWithPagination = await weaponService.ListWeapons({ userId, page, perPage });
  res.status(200).json(weaponsWithPagination);
}

const Create = async (req, res) => {
  const createValidator = Joi.object({
    name: Joi.string().min(3).required(),
    level: Joi.number().integer().min(1).default(1),
    attack: Joi.number().integer().min(1).required(),
    durability: Joi.number().integer().min(1).required(),
  });

  const { error, value } = createValidator.validate(req.body);
  if (error) {
    throw NewBadRequestError('Invalid parameters', {
      errorMessages: error.details.map(i => i.message)
    });
  }

  const userId = req.user.id;
  const createdWeapon = await weaponService.CreateWeapon({ ...value, userId });
  res.status(201).json(createdWeapon);
}

const Update = async (req, res) => {
  const updateValidator = Joi.object({
    name: Joi.string().min(3).optional(),
    level: Joi.number().integer().min(1).optional(),
    attack: Joi.number().integer().min(1).optional(),
    durability: Joi.number().integer().min(1).optional(),
  });

  const { error, value } = updateValidator.validate(req.body);
  if (error) {
    throw NewBadRequestError('Invalid parameters', {
      errorMessages: error.details.map(i => i.message)
    });
  }

  const { id } = req.params;
  const userId = req.user.id;

  const targetWeapon = await weaponService.FindWeaponById({ userId, weaponId: parseInt(id) });
  if (!targetWeapon) {
    throw NewNotFoundError('Weapon not found from current user');
  }

  const updatedWeapon = await weaponService.UpdateWeapon({
    weaponId: parseInt(id),
    userId,
    ...value
  });

  if (!updatedWeapon) {
    throw NewUnprocessableEntityError("Failed to update weapon")
  }

  res.status(200).json(updatedWeapon);
}

const Delete = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  
  const targetWeapon = await weaponService.FindWeaponById({ userId, weaponId: parseInt(id) });
  if (!targetWeapon) {
    throw NewNotFoundError('Weapon not found from current user');
  }

  await weaponService.DeleteWeapon({ userId, weaponId: parseInt(id), });
  res.status(204).send();
}

module.exports = {
  Index,
  Create,
  Update,
  Delete,
}
