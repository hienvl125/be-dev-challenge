const { indexValidator, createValidator, updateValidator } = require('./weapon.validator');
const { NewBadRequestError, NewNotFoundError } = require('./../../errors')
const weaponService = require('./weapon.service');

const Index = async (req, res) => {
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
